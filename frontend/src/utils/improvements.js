export const IMPROVEMENT_SUGGESTIONS = [
  'Make language more executive-focused',
  'Add environmental compliance references',
  'Simplify technical terminology',
  'Create a version for contractors',
]

export function classifyImprovement(text) {
  const t = text.toLowerCase()
  if (t.includes('executive') || t.includes('leadership') || t.includes('cxo')) return 'executive'
  if (t.includes('environment') || t.includes('compliance') || t.includes('cpcb')) return 'environmental'
  if (t.includes('simplif') || t.includes('plain') || t.includes('non-technical')) return 'simplified'
  if (t.includes('contractor') || t.includes('vendor') || t.includes('third-party')) return 'contractor'
  return 'general'
}

export const IMPROVEMENT_STEPS = [
  { id: 'analyze', description: 'Analyzing refinement request' },
  { id: 'apply', description: 'Applying changes to generated content' },
  { id: 'validate', description: 'Validating updated deliverable' },
]

export const IMPROVEMENT_DELTAS = {
  executive: {
    label: 'Executive tone applied',
    presentation: {
      subtitleOverride: 'Executive Briefing — Q3 Safety Initiative',
      extraBullets: {
        1: ['Board-ready KPI summary included', 'Strategic risk overview for leadership'],
        4: ['Leadership accountability framework added'],
      },
    },
    document: {
      summaryAppend:
        ' This version has been refined for CXO and Plant Head review, emphasizing strategic outcomes, accountability metrics, and board-ready formatting.',
      extraSection: {
        title: 'Leadership Action Items',
        content:
          'Plant Head to review program rollout by 15 July. Safety Committee to sign off on assessment criteria. HR to report completion rates weekly to executive leadership.',
      },
    },
    sop: {
      sectionAppend: {
        Purpose:
          ' This executive-aligned revision emphasizes governance, audit readiness, and leadership oversight requirements.',
      },
    },
    handbook: {
      chapterAppend: {
        1: ' This edition includes executive summary callouts and leadership accountability checkpoints at the start of each chapter.',
      },
    },
    video: {
      titleSuffix: ' — Leadership Edition',
      captionExtra: 'Executive overview segment included for plant leadership.',
    },
    podcast: {
      titleSuffix: ' — Executive Briefing',
      narratorNote: 'Tone adjusted for senior leadership audience.',
    },
  },
  environmental: {
    label: 'Environmental compliance added',
    presentation: {
      extraBullets: {
        2: ['CPCB emission standards referenced', 'Zero Liquid Discharge protocols included'],
        3: ['Environmental hazard identification checklist added'],
      },
    },
    document: {
      summaryAppend:
        ' Environmental compliance references have been integrated, including CPCB guidelines, effluent monitoring requirements, and Zero Liquid Discharge operational standards.',
      extraSection: {
        title: 'Environmental Compliance',
        content:
          'All training modules now reference Tata Steel environmental policy, CPCB notification requirements, and plant-specific ZLD monitoring procedures. Contractors must complete environmental awareness certification before site access.',
      },
    },
    sop: {
      sectionAppend: {
        'Safety Requirements':
          ' Additional environmental controls: spill containment kits mandatory, effluent discharge monitoring before shift handover, and immediate reporting of any environmental incidents to EHS within 30 minutes.',
      },
    },
    handbook: {
      chapterAppend: {
        4: ' Updated with environmental incident reporting procedures and CPCB compliance contact escalation paths.',
      },
    },
    video: {
      captionExtra: 'Environmental compliance segment: ZLD systems and emission monitoring.',
    },
    podcast: {
      narratorNote: 'Environmental compliance update segment added.',
    },
  },
  simplified: {
    label: 'Language simplified',
    presentation: {
      bulletPrefix: '→ ',
      simplifiedBullets: true,
    },
    document: {
      summaryAppend:
        ' Technical language has been simplified for broader workforce comprehension while retaining regulatory accuracy.',
    },
    sop: {
      sectionAppend: {
        Procedure:
          ' Note: Step descriptions simplified for field readability. Visual job aids recommended at each checkpoint.',
      },
    },
    handbook: {
      chapterAppend: {
        2: ' Key safety principles restated in plain language with visual reference guides for non-technical staff.',
      },
    },
    video: {
      captionExtra: 'Simplified narration script for new and contract workers.',
    },
    podcast: {
      narratorNote: 'Script simplified for plant-wide accessibility.',
    },
  },
  contractor: {
    label: 'Contractor version created',
    presentation: {
      subtitleOverride: 'Contractor Safety Induction — Q3 2026',
      extraBullets: {
        0: ['Contractor Safety Passport requirements', 'Permit-to-Work overview for external teams'],
        2: ['Contractor PPE verification checklist', 'Hot work permit procedures for third-party teams'],
      },
    },
    document: {
      summaryAppend:
        ' This contractor-specific version includes permit-to-work requirements, safety passport verification, and third-party escalation procedures.',
      extraSection: {
        title: 'Contractor Requirements',
        content:
          'All external maintenance teams must complete contractor safety induction within 24 hours of site entry. Safety passport verification required at all BF#4 access points. Hot work permits mandatory for welding, cutting, and grinding activities.',
      },
    },
    sop: {
      titleOverride: 'Contractor Safety Compliance SOP — Field Edition',
      sectionAppend: {
        Scope: ' Enhanced contractor onboarding checklist and digital safety passport integration included in this revision.',
      },
    },
    handbook: {
      chapterAppend: {
        3: ' Contractor-specific operational guidelines including escort requirements, restricted area access, and toolbox talk documentation.',
      },
    },
    video: {
      titleSuffix: ' — Contractor Edition',
      captionExtra: 'Contractor onboarding and permit-to-work procedures highlighted.',
    },
    podcast: {
      titleSuffix: ' — Contractor Briefing',
      narratorNote: 'Tailored for external maintenance and project teams.',
    },
  },
  general: {
    label: 'Refinement applied',
    document: {
      summaryAppend: ' Content has been updated based on your refinement request.',
    },
  },
}

export function getAppliedDeltas(appliedImprovements) {
  return appliedImprovements.map((item) => {
    const type = classifyImprovement(item.text)
    const delta = IMPROVEMENT_DELTAS[type] || IMPROVEMENT_DELTAS.general
    return { ...delta, type, requestText: item.text, id: item.id }
  })
}

export function mergePresentationSlides(baseSlides, deltas) {
  let subtitle = null
  const extraBulletsByIndex = {}

  deltas.forEach((delta) => {
    const p = delta.presentation
    if (!p) return
    if (p.subtitleOverride) subtitle = p.subtitleOverride
    if (p.extraBullets) {
      Object.entries(p.extraBullets).forEach(([idx, bullets]) => {
        const i = Number(idx)
        extraBulletsByIndex[i] = [...(extraBulletsByIndex[i] || []), ...bullets]
      })
    }
  })

  return baseSlides.map((slide, index) => {
    const extras = extraBulletsByIndex[index] || []
    let bullets = slide.bullets ? [...slide.bullets, ...extras] : extras.length ? extras : slide.bullets

    if (deltas.some((d) => d.presentation?.simplifiedBullets) && bullets) {
      bullets = bullets.map((b) =>
        b.replace(/ per SOP-[A-Z0-9-]+/g, '').replace(/\(IS [0-9]+\)/g, '(standards)')
      )
    }

    if (slide.type === 'title' && extras.length > 0) {
      return {
        ...slide,
        subtitle: subtitle || slide.subtitle,
        titleNote: extras.join(' · '),
      }
    }

    return {
      ...slide,
      subtitle: index === 0 && subtitle ? subtitle : slide.subtitle,
      bullets,
    }
  })
}

export function mergeDocumentSections(baseSections, deltas) {
  const sections = baseSections.map((s) => ({ ...s }))

  deltas.forEach((delta) => {
    const d = delta.document
    if (!d) return

    if (d.summaryAppend) {
      const summary = sections.find((s) => s.title === 'Executive Summary')
      if (summary) summary.content += d.summaryAppend
    }

    if (d.extraSection) {
      const exists = sections.find((s) => s.title === d.extraSection.title)
      if (!exists) sections.push({ ...d.extraSection })
    }
  })

  return sections
}

export function mergeSopSections(baseSections, deltas) {
  const sections = baseSections.map((s) => ({ ...s }))

  deltas.forEach((delta) => {
    if (delta.sop?.titleOverride) {
      sections._titleOverride = delta.sop.titleOverride
    }
    if (delta.sop?.sectionAppend) {
      Object.entries(delta.sop.sectionAppend).forEach(([title, append]) => {
        const section = sections.find((s) => s.title === title)
        if (section) section.content += append
      })
    }
  })

  return sections
}

export function mergeHandbookChapters(baseChapters, deltas) {
  return baseChapters.map((ch) => {
    let content = ch.content
    deltas.forEach((delta) => {
      const append = delta.handbook?.chapterAppend?.[ch.id]
      if (append) content += append
    })
    return { ...ch, content }
  })
}

export function getVideoMeta(deltas) {
  let titleSuffix = ''
  let captionExtra = ''
  deltas.forEach((delta) => {
    if (delta.video?.titleSuffix) titleSuffix += delta.video.titleSuffix
    if (delta.video?.captionExtra) captionExtra = delta.video.captionExtra
  })
  return { titleSuffix, captionExtra }
}

export function getPodcastMeta(deltas) {
  let titleSuffix = ''
  let narratorNote = ''
  deltas.forEach((delta) => {
    if (delta.podcast?.titleSuffix) titleSuffix += delta.podcast.titleSuffix
    if (delta.podcast?.narratorNote) narratorNote = delta.podcast.narratorNote
  })
  return { titleSuffix, narratorNote }
}
