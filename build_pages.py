#!/usr/bin/env python3
"""Generates /languages/<slug>.html (one page per language) and /datasets/<slug>.html
(one page per image / video dataset).

Run from the project root:   python3 build_pages.py
Languages are read from site.js (LD and RD), so to add a language: add it there and re-run."""
import re, unicodedata, pathlib, html

ROOT = pathlib.Path(__file__).resolve().parent
JS = (ROOT / 'site.js').read_text(encoding='utf-8')


def SL(n):
    n = unicodedata.normalize('NFD', n.lower())
    n = ''.join(c for c in n if not unicodedata.combining(c))
    return re.sub(r'[^a-z0-9]+', '-', n).strip('-')


def FL(c, w=20, cls='fl'):
    return (f'<img class="{cls}" src="https://flagcdn.com/w40/{c}.png" srcset="https://flagcdn.com/w80/{c}.png 2x" '
            f'width="{w}" height="{round(w * .75)}" alt="" loading="lazy">')


# ---------- data (parsed from site.js) ----------
ld = re.search(r"const LD=`(.*?)`;", JS, re.S).group(1).strip().split('\n')
CORE = []
for row in ld:
    n, f, d = row.split('|')
    CORE.append(dict(n=n, f=f, d=[x.split(':') for x in d.split(',')]))
rd = re.search(r"const RD=`(.*?)`\.split", JS, re.S).group(1).strip().split(',')
RARE = [dict(n=x.split('|')[0], f=x.split('|')[1]) for x in rd]

slugs = [SL(l['n']) for l in CORE + RARE]
assert len(slugs) == len(set(slugs)), 'duplicate slug'

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">')


def page(title, desc, body):
    return (f'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<title>{html.escape(title)} — Grey Global</title><meta name="description" content="{html.escape(desc, quote=True)}">'
            f'<link rel="icon" href="/favicon.svg">{FONTS}<link rel="stylesheet" href="/styles.css"></head>'
            f'<body><div id="hdr"></div><main>{body}</main><div id="ftr"></div><script src="/site.js"></script></body></html>')


def cta(text, href='/contact', label='Request a dataset'):
    return f'<div class="cta-band"><div class="wrap"><h2>{text}</h2><a class="btn" href="{href}">{label}</a></div></div>'


def ships(cls, meta):
    return (f'<section class="{cls}"><div class="wrap"><div class="split"><div><span class="eyebrow">What you get</span><h2>Every dataset ships with</h2></div>'
            f'<div class="flow"><div><b>Files</b>In your format, checksummed</div><div><b>Metadata</b>{meta}</div>'
            '<div><b>Transcripts and labels</b>QA-passed</div><div><b>License</b>Clear usage terms</div></div></div></div></section>')


def quality(cls):
    return (f'<section class="{cls}"><div class="wrap"><div class="head"><span class="eyebrow">Quality</span><h2>Every file is traceable</h2></div><div class="grid3">'
            '<div class="q"><h3>Consent-first sourcing</h3><p>Every contributor signs a locale-appropriate consent and usage agreement before recording starts.</p></div>'
            '<div class="q"><h3>Native review</h3><p>Every audio file is transcribed and labeled, then checked by reviewers fluent in the source language, never machine-translated.</p></div>'
            '<div class="q"><h3>Full audit trail</h3><p>Every file traces to a contributor ID, capture session and QA pass.</p></div></div></div></section>')


# ---------- language pages ----------
def ds_card(id_, name, blurb, tag):
    return (f'<article class="card"><div class="body"><span class="id">{id_}</span>'
            f'<h3 style="font:600 17px var(--fb)">{name}</h3><p>{blurb}</p>'
            f'<div class="meta"><span>5,000+ hrs</span><span>Transcribed and labeled</span></div>'
            f'<div class="foot"><span class="tag">{tag}</span><a class="link" href="/contact?ds={id_}">Request access</a></div></div></article>')


def lang_page(l, kind, idx, group):
    n, f = l['n'], l['f']
    base = re.sub(r'\W', '', n).upper()
    core = kind == 'core'
    eyebrow = 'Core language' if core else 'Rare language'
    lead = f'5,000+ hours of conversational and free speech from native {n} speakers, consented, transcribed and labeled.'
    flag = FL(f, 44, 'fl hflag')
    hero = (f'<div class="page-hero"><div class="wrap"><a class="crumb mono" href="/languages">← All languages</a>'
            f'<span class="eyebrow">{eyebrow}</span><h1>{flag}{n} speech data</h1><p>{lead}</p></div></div>')
    if core:
        cards = (ds_card(f'SP-{base}-CONV', f'{n} conversational speech', 'Two native speakers talking naturally. Every file is transcribed and labeled.', 'Conversational')
                 + ds_card(f'SP-{base}-FREE', f'{n} free speech', 'One speaker talking unscripted on open topics. Every file is transcribed and labeled.', 'Free speech'))
    else:
        cards = ds_card(f'RARE-{base}', f'{n} conversational and free speech',
                        'A low-resource language, recorded with native speakers. Conversational and free speech, transcribed and labeled.', 'Rare language')
    ds = (f'<section><div class="wrap"><div class="head"><span class="eyebrow">Datasets</span><h2>{n} datasets you can license</h2>'
          f'<p>Request access and we confirm licensing terms with you directly.</p></div><div class="grid2">{cards}</div></div></section>')
    dia = ''
    if core:
        items = ''.join(f'<article class="lc"><div class="lh">{FL(c, 36)}<div><h3>{d}</h3><span>{n} dialect</span></div></div></article>' for d, c in l['d'])
        dia = (f'<section class="alt"><div class="wrap"><div class="head"><span class="eyebrow">Regional varieties</span><h2>{n} dialects we cover</h2>'
               f'<p>Need a dialect that is not listed? Sourcing a new one is a standard custom order.</p></div><div class="lgrid">{items}</div></div></section>')
    prev = group[idx - 1] if idx > 0 else None
    nxt = group[idx + 1] if idx < len(group) - 1 else None
    pn = '<div class="pn">'
    pn += f'<a href="/languages/{SL(prev["n"])}">← {prev["n"]}</a>' if prev else '<span></span>'
    pn += f'<a href="/languages/{SL(nxt["n"])}">{nxt["n"]} →</a>' if nxt else '<span></span>'
    pn += '</div>'
    a, b = ('', 'alt') if core else ('alt', '')   # keep section backgrounds alternating
    body = (hero + ds + dia + ships(a or '', 'Speaker, device, locale') + quality(b) +
            f'<section class="{a}"><div class="wrap">{pn}</div></section>' +
            cta(f'Need more {n} data, or a variety we do not list?', '/custom-orders', 'Start a custom order'))
    title = f'{n} speech data'
    desc = f'{n} conversational and free speech data: 5,000+ hours from native speakers, transcribed and labeled. Request access.'
    return SL(n), page(title, desc, body)


(ROOT / 'languages').mkdir(exist_ok=True)
for kind, group in (('core', CORE), ('rare', RARE)):
    for i, l in enumerate(group):
        s, h = lang_page(l, kind, i, group)
        (ROOT / 'languages' / f'{s}.html').write_text(h, encoding='utf-8')

# ---------- dataset pages (image + video) ----------
DS = [
    dict(id='DS-0410', slug='radiology-images', t='Radiology image library', kind='image', th='rad', med=True,
         specs=['1,000,000+ images', 'DICOM + PNG'], labels=['De-identified', 'Clinician-reviewed labels'],
         blurb='A large library of radiology images with clinician-reviewed labels, delivered in DICOM or PNG.',
         use='Detection, segmentation and triage models.', tags=['Image', 'DICOM', 'De-identified']),
    dict(id='DS-0427', slug='surgical-video', t='Surgical procedure video', kind='video', th='surg', med=True,
         specs=['Laparoscopic and open surgery', '1080p+'], labels=['Phase and instrument labeled'],
         blurb='Recorded surgical procedures labeled by phase and instrument.',
         use='Workflow recognition, skill assessment and tool tracking.', tags=['Video', 'Phase-labeled', 'De-identified']),
    dict(id='DS-0098', slug='kitchen-objects', t='Everyday kitchen objects', kind='image', th='image', med=False,
         specs=['12,000 images', 'COCO format'], labels=['Bounding boxes'],
         blurb='12,000 images of everyday kitchen objects, in COCO format with bounding boxes.',
         use='Computer vision and object detection models.', tags=['Image', 'COCO', 'Bounding boxes']),
    dict(id='DS-0231', slug='retail-storefront-video', t='Retail storefront video', kind='video', th='video', med=False,
         specs=['300 clips', '1080p'], labels=['Action-labeled'],
         blurb='300 retail storefront clips in 1080p, labeled by action.',
         use='Computer vision and action recognition models.', tags=['Video', '1080p', 'Action-labeled']),
    dict(id='DS-0304', slug='hand-gesture-video', t='Hand gesture video set', kind='video', th='video', med=False,
         specs=['8,500 clips', 'MP4'], labels=['Landmark-annotated'],
         blurb='8,500 hand gesture clips in MP4, with landmark annotations.',
         use='Gesture and motion models.', tags=['Video', 'MP4', 'Landmark-annotated']),
    dict(id='DS-0059', slug='multilingual-form-scans', t='Multilingual form scans', kind='image', th='image', med=False,
         specs=['25,000 pages', '14 languages'], labels=['OCR-ready'],
         blurb='25,000 scanned form pages across 14 languages, ready for OCR.',
         use='OCR and document intelligence.', tags=['Image', '14 languages', 'OCR-ready']),
]

MED = ('<section class="alt"><div class="wrap"><div class="head"><span class="eyebrow">Medical data</span><h2>Extra safeguards for patient data</h2></div><div class="grid3">'
       '<div class="q"><h3>De-identification</h3><p>Patient identifiers are removed from images, video and metadata before data leaves the source.</p></div>'
       '<div class="q"><h3>Consent and approvals</h3><p>Medical data is sourced with patient consent and the ethics approvals required in each country.</p></div>'
       '<div class="q"><h3>Clinician review</h3><p>Labels are checked by qualified clinicians, not generalist annotators.</p></div></div></div></section>')


def ships_ds(cls):
    return (f'<section class="{cls}"><div class="wrap"><div class="split"><div><span class="eyebrow">What you get</span><h2>Every dataset ships with</h2></div>'
            '<div class="flow"><div><b>Files</b>In your format, checksummed</div><div><b>Metadata</b>Capture and locale details</div>'
            '<div><b>Labels</b>QA-passed</div><div><b>License</b>Clear usage terms</div></div></div></div></section>')


(ROOT / 'datasets').mkdir(exist_ok=True)
for d in DS:
    kind = d['kind'].capitalize()
    eyebrow = f'Medical · {kind}' if d['med'] else f'{kind} dataset'
    hero = (f'<div class="page-hero"><div class="wrap"><a class="crumb mono" href="/catalog">← Catalog</a><span class="eyebrow">{eyebrow}</span>'
            f'<h1>{d["t"]}</h1><p>{d["blurb"]}</p></div></div>')
    meta = ''.join(f'<span>{x}</span>' for x in d['specs'] + d['labels'])
    tags = ' '.join(f'<span class="tag">{t}</span>' for t in d['tags'])
    card = (f'<article class="card mc"><div class="thumb big" data-t="{d["th"]}"></div><div class="body"><span class="id">{d["id"]}</span>'
            f'<h3 style="font:600 17px var(--fb)">{d["t"]}</h3><p>{d["blurb"]}</p><div class="meta">{meta}</div><div>{tags}</div>'
            f'<div class="foot"><span></span><a class="link" href="/contact?ds={d["id"]}">Request access</a></div></div></article>')
    side = (f'<div class="q"><h3>Built for</h3><p>{d["use"]}</p></div>'
            '<div class="q"><h3>Licensing</h3><p>Request access and we confirm licensing terms with you directly.</p></div>')
    main = f'<section><div class="wrap"><div class="grid2">{card}<div style="display:grid;gap:18px;align-content:start">{side}</div></div></div></section>'
    others = ''.join(
        f'<article class="card"><div class="body"><span class="id">{o["id"]}</span><h3 style="font:600 17px var(--fb)"><a href="/datasets/{o["slug"]}">{o["t"]}</a></h3>'
        f'<div class="meta"><span>{" · ".join(o["specs"])}</span><span>{" · ".join(o["labels"])}</span></div>'
        f'<div class="foot"><span class="tag">{o["kind"]}</span><a class="link" href="/datasets/{o["slug"]}">Details</a></div></div></article>'
        for o in DS if o is not d)
    if d['med']:
        mid = MED + ships_ds('')
        more_cls = 'alt'
    else:
        mid = ships_ds('alt')
        more_cls = ''
    more = (f'<section class="{more_cls}"><div class="wrap"><div class="head"><span class="eyebrow">More datasets</span><h2>Other image and video sets</h2></div>'
            f'<div class="grid3">{others}</div></div></section>')
    body = hero + main + mid + more + cta(f'Need something like {d["t"].lower()} built to spec?', '/custom-orders', 'Start a custom order')
    (ROOT / 'datasets' / f'{d["slug"]}.html').write_text(
        page(d['t'], f'{d["blurb"]} Request access from Grey Global.', body), encoding='utf-8')

print('languages:', len(CORE), 'core +', len(RARE), 'rare |', 'datasets:', len(DS))
