"""
Strip third-party branding out of the concept mockups.

Every mockup in the pack was generated with real company logos (Deloitte, EY,
Heineken, Kearys and others) and invented-but-plausible business names. Neither
can appear on the live site: a logo reads as a claim about a real relationship,
and an invented name carries the same misrepresentation risk as a real one.

This script paints over each of them with a neutral "Your business here" plaque,
matched to the panel's own colour and drawn in the panel's own perspective, and
writes the cleaned image into assets/img/.

Run:  python3 tools/neutralise.py
It only reads from the source mockups and writes into assets/img/.
"""

from PIL import Image, ImageDraw, ImageFont

SANS       = "/System/Library/Fonts/Supplemental/Arial.ttf"
SANS_BOLD  = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
SUPERSAMPLE = 4


# ---------------------------------------------------------------- perspective
def _solve(m, v):
    """Gaussian elimination; small systems only."""
    n = len(v)
    for i in range(n):
        p = max(range(i, n), key=lambda r: abs(m[r][i]))
        m[i], m[p] = m[p], m[i]
        v[i], v[p] = v[p], v[i]
        for r in range(i + 1, n):
            f = m[r][i] / m[i][i]
            for c in range(i, n):
                m[r][c] -= f * m[i][c]
            v[r] -= f * v[i]
    x = [0.0] * n
    for i in range(n - 1, -1, -1):
        s = sum(m[i][c] * x[c] for c in range(i + 1, n))
        x[i] = (v[i] - s) / m[i][i]
    return x


def perspective_coeffs(dst, src):
    """Coefficients mapping destination points back to source points."""
    m, v = [], []
    for (dx, dy), (sx, sy) in zip(dst, src):
        m.append([dx, dy, 1, 0, 0, 0, -sx * dx, -sx * dy]); v.append(sx)
        m.append([0, 0, 0, dx, dy, 1, -sy * dx, -sy * dy]); v.append(sy)
    return _solve(m, v)


def shrink(quad, f):
    """Pull a quad in towards its centre, so frames and fixings survive."""
    cx = sum(p[0] for p in quad) / 4.0
    cy = sum(p[1] for p in quad) / 4.0
    return [(cx + (x - cx) * f, cy + (y - cy) * f) for x, y in quad]


# ---------------------------------------------------------------- panel paint
def sample_fill(img, quad, inset=0.80, light_panel=True):
    """Average colour of the panel, sampled away from its printed artwork.

    light_panel=True keeps the brightest quarter (white plaque, dark ink);
    light_panel=False keeps the darkest quarter (green board, white lettering).
    """
    q = shrink(quad, inset)
    xs = [p[0] for p in q]; ys = [p[1] for p in q]
    px = img.load()
    band, w, h = [], img.size[0], img.size[1]
    for y in range(int(min(ys)), int(max(ys))):
        for x in range(int(min(xs)), int(max(xs))):
            if 0 <= x < w and 0 <= y < h:
                band.append(px[x, y])
    band.sort(key=lambda c: (c[0] + c[1] + c[2]), reverse=light_panel)
    top = band[: max(1, len(band) // 4)]          # the panel, not the ink on it
    return tuple(round(sum(c[i] for c in top) / len(top)) for i in range(3))


def gradient_fill(img, quad, size, light_panel=True, out=14):
    """A tile of the surface's own colour, sampled just outside the patch.

    A flat fill leaves a visible rectangle wherever the surface is shaded, so
    the four corners are sampled from the untouched pixels around the quad and
    interpolated across the tile.
    """
    px = img.load()
    W, H = img.size
    cx = sum(p[0] for p in quad) / 4.0
    cy = sum(p[1] for p in quad) / 4.0
    corners = []
    for x, y in quad:
        ox = x + (out if x > cx else -out)
        oy = y + (out if y > cy else -out)
        band = []
        for j in range(-6, 7):
            for i in range(-6, 7):
                sx, sy = int(ox) + i, int(oy) + j
                if 0 <= sx < W and 0 <= sy < H:
                    band.append(px[sx, sy])
        band.sort(key=lambda c: sum(c), reverse=light_panel)
        keep = band[: max(1, len(band) // 3)]
        corners.append(tuple(sum(c[k] for c in keep) / len(keep) for k in range(3)))

    w, h = size
    tile = Image.new("RGB", (w, h))
    tp = tile.load()
    tl, tr, br, bl = corners
    for y in range(h):
        v = y / max(1, h - 1)
        left = [tl[k] + (bl[k] - tl[k]) * v for k in range(3)]
        right = [tr[k] + (br[k] - tr[k]) * v for k in range(3)]
        for x in range(w):
            u = x / max(1, w - 1)
            tp[x, y] = tuple(int(left[k] + (right[k] - left[k]) * u) for k in range(3))
    return tile.convert("RGBA")


def feather_edges(tile, frac=0.10):
    """Fade the tile's alpha at its border so the patch has no visible seam."""
    w, h = tile.size
    fx, fy = max(1, int(w * frac)), max(1, int(h * frac))
    mask = Image.new("L", (w, h), 255)
    mp = mask.load()
    for y in range(h):
        ay = min(1.0, (min(y, h - 1 - y) + 1) / fy)
        for x in range(w):
            ax = min(1.0, (min(x, w - 1 - x) + 1) / fx)
            a = min(ax, ay)
            if a < 1.0:
                mp[x, y] = int(255 * a * a * (3 - 2 * a))
    tile.putalpha(mask)
    return tile


def fit_text(draw, lines, font_path, box_w, box_h, tracking, max_size):
    """Largest size at which every line fits the box."""
    size = max_size
    while size > 6:
        f = ImageFont.truetype(font_path, size)
        widest = max(
            sum(f.getlength(ch) + tracking * size for ch in ln) - tracking * size
            for ln in lines
        )
        total = len(lines) * size * 1.35
        if widest <= box_w and total <= box_h:
            return f, size
        size -= 1
    return ImageFont.truetype(font_path, 6), 6


def tracked(draw, x, y, text, font, fill, tracking):
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += font.getlength(ch) + tracking


def make_plaque(w, h, fill, lines, ink, font_path=SANS_BOLD,
                tracking=0.10, pad=0.14, rule=False, max_size=None):
    """A flat replacement panel, drawn large and scaled down by the caller."""
    tile = Image.new("RGBA", (w, h), fill + (255,))
    d = ImageDraw.Draw(tile)
    box_w, box_h = w * (1 - pad * 2), h * (1 - pad * 2)
    font, size = fit_text(d, lines, font_path, box_w, box_h,
                          tracking, max_size or int(h * 0.5))
    lh = size * 1.35
    top = (h - lh * len(lines)) / 2 + (lh - size) / 2 - size * 0.10
    for i, ln in enumerate(lines):
        tw = sum(font.getlength(c) + tracking * size for c in ln) - tracking * size
        tracked(d, (w - tw) / 2, top + i * lh, ln, font, ink, tracking * size)
    if rule:
        y = top + lh * len(lines) + size * 0.5
        d.line([(w * 0.36, y), (w * 0.64, y)], fill=ink + (110,), width=max(1, h // 90))
    return tile


def make_text_on(tile, lines, ink, font_path=SANS_BOLD, tracking=0.10, pad=0.14):
    """Centre a placeholder line or two on an already-filled tile."""
    w, h = tile.size
    d = ImageDraw.Draw(tile)
    font, size = fit_text(d, lines, font_path, w * (1 - pad * 2), h * (1 - pad * 2),
                          tracking, int(h * 0.5))
    lh = size * 1.35
    top = (h - lh * len(lines)) / 2 + (lh - size) / 2 - size * 0.10
    for i, ln in enumerate(lines):
        tw = sum(font.getlength(c) + tracking * size for c in ln) - tracking * size
        tracked(d, (w - tw) / 2, top + i * lh, ln, font, ink, tracking * size)
    return tile


def patch(base, quad, tile, feather=0):
    """Drop a flat tile onto a quad in the photograph's own perspective."""
    xs = [p[0] for p in quad]; ys = [p[1] for p in quad]
    x0, y0 = int(min(xs)) - 2, int(min(ys)) - 2
    x1, y1 = int(max(xs)) + 3, int(max(ys)) + 3
    bw, bh = x1 - x0, y1 - y0
    local = [(x - x0, y - y0) for x, y in quad]
    src = [(0, 0), (tile.width, 0), (tile.width, tile.height), (0, tile.height)]
    warped = tile.transform((bw, bh), Image.PERSPECTIVE,
                            perspective_coeffs(local, src), Image.BICUBIC)
    base.alpha_composite(warped, (x0, y0))


# =============================================================== the mockups
SRC = "/Users/shaneconnolly/Downloads"
OUT = "assets/img"

PLACEHOLDER_INK = (74, 80, 94)


def open_rgba(path):
    return Image.open(path).convert("RGBA")


# --- 1. The Friends of Rushbrooke wall -------------------------------------
# Fifteen plaques, detected as a 5 x 3 grid on the gable. Every one of them
# carried an invented business name in the mockup; all fifteen come out.
WALL_FINAL = (150, 230, 1330, 1017)      # 3:2, framed on the gable
WALL_QUADS = [
    [(286, 440), (452, 440), (452, 526), (286, 531)],
    [(464, 440), (606, 440), (606, 521), (464, 525)],
    [(617, 440), (745, 441), (745, 518), (616, 521)],
    [(754, 441), (871, 441), (871, 514), (755, 517)],
    [(880, 441), (987, 441), (987, 511), (880, 514)],
    [(286, 545), (452, 539), (452, 624), (286, 636)],
    [(464, 538), (606, 534), (606, 614), (465, 624)],
    [(617, 533), (745, 529), (745, 606), (617, 614)],
    [(755, 529), (871, 526), (871, 595), (755, 606)],
    [(880, 526), (987, 522), (985, 594), (880, 600)],
    [(286, 650), (452, 637), (452, 723), (287, 740)],
    [(465, 637), (606, 627), (606, 707), (465, 722)],
    [(617, 626), (745, 618), (745, 694), (617, 706)],
    [(755, 618), (871, 611), (868, 683), (755, 693)],
    [(880, 611), (987, 605), (987, 673), (880, 682)],
]


# The mockup's wall reads "FRIENDS OF RLTCC". The prospectus is explicit that
# RLTCC means nothing to a prospect and should not appear in external copy, and
# the site calls it the Friends of Rushbrooke wall — so the header is reset too.
HEADER_QUAD = [(518, 306), (898, 309), (898, 378), (518, 375)]
SERIF = "/System/Library/Fonts/Supplemental/Times New Roman.ttf"


def build_header(img, flat):
    quad = HEADER_QUAD
    w = int(max(p[0] for p in quad) - min(p[0] for p in quad)) * SUPERSAMPLE
    h = int(max(p[1] for p in quad) - min(p[1] for p in quad)) * SUPERSAMPLE
    tile = gradient_fill(flat, quad, (w, h), light_panel=False)
    d = ImageDraw.Draw(tile)
    ink = (231, 233, 231)

    # "FRIENDS of RUSHBROOKE" — the small "of" is how the original sign sets it.
    big, small, track = h * 0.62, h * 0.40, 0.045
    fb = ImageFont.truetype(SERIF, int(big))
    fs = ImageFont.truetype(SERIF, int(small))
    parts = [("FRIENDS", fb, big), ("OF", fs, small), ("RUSHBROOKE", fb, big)]
    gap = h * 0.16

    def run_w(txt, f, size):
        return sum(f.getlength(c) + track * size for c in txt) - track * size

    total = sum(run_w(t, f, s) for t, f, s in parts) + gap * (len(parts) - 1)
    scale = min(1.0, (w * 0.93) / total)
    if scale < 1.0:
        big, small = big * scale, small * scale
        fb = ImageFont.truetype(SERIF, int(big))
        fs = ImageFont.truetype(SERIF, int(small))
        parts = [("FRIENDS", fb, big), ("OF", fs, small), ("RUSHBROOKE", fb, big)]
        gap *= scale
        total = sum(run_w(t, f, s) for t, f, s in parts) + gap * (len(parts) - 1)

    x = (w - total) / 2
    for txt, f, size in parts:
        top = (h - big) / 2 + (big - size) * 0.86      # sit small caps on the baseline
        tracked(d, x, top, txt, f, ink, track * size)
        x += run_w(txt, f, size) + gap
    patch(img, quad, feather_edges(tile, 0.025))


def build_wall():
    img = open_rgba(f"{SRC}/ChatGPT Image Sep 6, 2026, 12_03_43 PM.png")
    flat = img.convert("RGB")
    build_header(img, flat)
    for quad in WALL_QUADS:
        fill = sample_fill(flat, quad)
        q = shrink(quad, 0.94)
        w = int(max(p[0] for p in q) - min(p[0] for p in q)) * SUPERSAMPLE
        h = int(max(p[1] for p in q) - min(p[1] for p in q)) * SUPERSAMPLE
        tile = make_plaque(w, h, fill, ["YOUR BUSINESS", "HERE"],
                           PLACEHOLDER_INK, tracking=0.09, pad=0.14)
        patch(img, q, tile)
    out = img.crop(WALL_FINAL).convert("RGB")
    out = out.resize((1200, round(1200 * out.size[1] / out.size[0])), Image.LANCZOS)
    out.save(f"{OUT}/wall.jpg", quality=82, optimize=True, progressive=True)
    print("wall.jpg", out.size)


# --- 2. Named facilities: the tiered seating plaque -------------------------
# The mockup plaque carried an invented carpentry business. The plaque stays,
# the business does not.
SEATING_QUAD = [(1114, 442), (1395, 433), (1394, 955), (1115, 875)]
SEATING_FINAL = (430, 300, 1440, 973)   # 3:2, benches left, plaque right


def build_seating():
    img = open_rgba(f"{SRC}/ChatGPT Image Sep 6, 2026, 11_36_21 AM.png")
    flat = img.convert("RGB")
    quad = shrink(SEATING_QUAD, 0.955)
    w = int(max(p[0] for p in quad) - min(p[0] for p in quad)) * 3
    h = int(max(p[1] for p in quad) - min(p[1] for p in quad)) * 3
    tile = gradient_fill(flat, quad, (w, h), light_panel=True, out=-26)
    d = ImageDraw.Draw(tile)
    ink = (78, 62, 52)

    head = ["YOUR", "BUSINESS", "HERE"]
    fh, sh = fit_text(d, head, SANS_BOLD, w * 0.74, h * 0.34, 0.05, int(h * 0.14))
    lh = sh * 1.22
    top = h * 0.20
    for i, ln in enumerate(head):
        tw = sum(fh.getlength(c) + 0.05 * sh for c in ln) - 0.05 * sh
        tracked(d, (w - tw) / 2, top + i * lh, ln, fh, ink, 0.05 * sh)

    y = top + lh * len(head) + sh * 0.55
    d.line([(w * 0.40, y), (w * 0.60, y)], fill=ink + (140,), width=max(1, h // 260))

    foot = ["PROUD TO SUPPORT", "RUSHBROOKE LAWN TENNIS", "& CROQUET CLUB"]
    ff, sf = fit_text(d, foot, SANS, w * 0.80, h * 0.22, 0.12, int(h * 0.05))
    lf = sf * 1.7
    ty = y + sh * 0.9
    for i, ln in enumerate(foot):
        tw = sum(ff.getlength(c) + 0.12 * sf for c in ln) - 0.12 * sf
        tracked(d, (w - tw) / 2, ty + i * lf, ln, ff, ink, 0.12 * sf)

    patch(img, quad, feather_edges(tile, 0.02))
    out = img.crop(SEATING_FINAL).convert("RGB")
    out = out.resize((1200, round(1200 * out.size[1] / out.size[0])), Image.LANCZOS)
    out.save(f"{OUT}/named-facilities.jpg", quality=82, optimize=True, progressive=True)
    print("named-facilities.jpg", out.size)


# --- 3. Clubhouse noticeboards ---------------------------------------------
# Six partner cells on the left-hand board, all carrying real company logos.
NOTICE_CROP = (772, 113, 1536, 551)
NOTICE_CELLS = []
for _y0, _y1 in ((166, 227), (232, 294), (299, 361)):
    for _x0, _x1 in ((88, 230), (237, 378)):
        NOTICE_CELLS.append([(_x0, _y0), (_x1, _y0 - 3), (_x1, _y1 - 3), (_x0, _y1)])


def build_noticeboards():
    img = open_rgba(f"{SRC}/ChatGPT Image Sep 6, 2026, 12_08_16 PM.png").crop(NOTICE_CROP)
    flat = img.convert("RGB")
    for quad in NOTICE_CELLS:
        q = shrink(quad, 0.94)
        w = int(max(p[0] for p in q) - min(p[0] for p in q)) * 6
        h = int(max(p[1] for p in q) - min(p[1] for p in q)) * 6
        tile = gradient_fill(flat, q, (w, h), light_panel=True, out=5)
        tile = make_text_on(tile, ["YOUR BUSINESS", "HERE"], PLACEHOLDER_INK,
                            SANS_BOLD, tracking=0.09, pad=0.15)
        patch(img, q, feather_edges(tile, 0.03))
    img.convert("RGB").save(f"{OUT}/noticeboards.jpg", quality=85,
                            optimize=True, progressive=True)
    print("noticeboards.jpg")


# --- 4. Interior pop-up banners --------------------------------------------
# Two roll-up banners, both carrying a real company's mark and strapline.
HALL_CROP = (0, 612, 768, 952)
HALL_FINAL = (128, 0, 638, 340)          # 3:2, both banners and the crest


def build_hallway():
    img = open_rgba(f"{SRC}/ChatGPT Image Sep 6, 2026, 10_42_36 AM (2).png").crop(HALL_CROP)
    flat = img.convert("RGB")

    blocks = [
        # quad,                                              lines,                       ink,            dark surface
        ([(188, 46), (302, 46), (302, 98), (188, 98)],
         ["YOUR BUSINESS", "HERE"], (238, 240, 244), False),
        ([(502, 34), (628, 32), (628, 130), (502, 132)],
         ["YOUR BUSINESS", "HERE"], (52, 58, 72), True),
        ([(502, 242), (628, 240), (628, 300), (502, 302)],
         ["PROUD TO SUPPORT", "RUSHBROOKE TENNIS", "& CROQUET CLUB"], (52, 58, 72), True),
    ]
    for quad, lines, ink, light in blocks:
        w = int(max(p[0] for p in quad) - min(p[0] for p in quad)) * 6
        h = int(max(p[1] for p in quad) - min(p[1] for p in quad)) * 6
        tile = gradient_fill(flat, quad, (w, h), light_panel=light, out=6)
        tile = make_text_on(tile, lines, ink, SANS_BOLD, tracking=0.07, pad=0.12)
        patch(img, quad, feather_edges(tile, 0.04))

    img.crop(HALL_FINAL).convert("RGB").save(f"{OUT}/interior-banners.jpg", quality=86,
                                             optimize=True, progressive=True)
    print("interior-banners.jpg")


# --- 5. Court board close-up ------------------------------------------------
# A still of the live preview, for the gallery card: the same blank board the
# page draws on, with the placeholder set on it and cropped in close.
BOARD_QUAD = [(132.6, 305.5), (259.3, 302.7), (261.3, 394.7), (134.6, 397.5)]
BOARD_CROP = (17, 150, 617, 550)         # 3:2 around the net post


def build_board_closeup():
    img = open_rgba(f"{OUT}/court-net-board.jpg")
    quad = shrink(BOARD_QUAD, 0.84)       # the board's printable safe area
    w = int(max(p[0] for p in quad) - min(p[0] for p in quad)) * 8
    h = int(max(p[1] for p in quad) - min(p[1] for p in quad)) * 8
    tile = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(tile)
    lines = ["YOUR BUSINESS", "HERE"]
    font, size = fit_text(d, lines, SANS_BOLD, w, h, 0.02, int(h * 0.5))
    lh = size * 1.2
    top = (h - lh * len(lines)) / 2 + (lh - size) / 2 - size * 0.12
    for i, ln in enumerate(lines):
        tw = sum(font.getlength(c) + 0.02 * size for c in ln) - 0.02 * size
        tracked(d, (w - tw) / 2, top + i * lh, ln, font, (242, 234, 209), 0.02 * size)
    patch(img, quad, tile)
    img.crop(BOARD_CROP).convert("RGB").save(f"{OUT}/court-board-closeup.jpg",
                                             quality=86, optimize=True, progressive=True)
    print("court-board-closeup.jpg")


if __name__ == "__main__":
    build_wall()
    build_seating()
    build_noticeboards()
    build_hallway()
    build_board_closeup()
