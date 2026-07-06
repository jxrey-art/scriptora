// ============================================================
// SCRIPTORA — Letter Data & Generation Engine
// ============================================================

export interface Category {
  id: string;
  emoji: string;
  label: string;
  description: string;
}

export interface Tone {
  id: string;
  label: string;
  emoji: string;
}

export const categories: Category[] = [
  { id: 'amour', emoji: '❤️', label: "Lettre d'amour", description: 'Exprimer vos sentiments les plus profonds' },
  { id: 'crush', emoji: '💕', label: 'Pour un crush', description: 'Faire connaître votre attirance avec délicatesse' },
  { id: 'couple', emoji: '💌', label: 'Demande en couple', description: 'Franchir le pas vers une relation officielle' },
  { id: 'excuses', emoji: '😔', label: "Lettre d'excuses", description: 'Demander pardon avec sincérité' },
  { id: 'amitie', emoji: '🤝', label: "Lettre d'amitié", description: 'Célébrer un lien précieux' },
  { id: 'anniversaire', emoji: '🎂', label: 'Anniversaire', description: 'Souhaiter un joyeux anniversaire' },
  { id: 'remerciement', emoji: '🙏', label: 'Remerciement', description: 'Exprimer votre gratitude' },
  { id: 'revoir', emoji: '👋', label: 'Au revoir', description: 'Dire au revoir avec émotion' },
  { id: 'saint-valentin', emoji: '🌹', label: 'Saint-Valentin', description: 'Célébrer la fête des amoureux' },
  { id: 'felicitations', emoji: '🎉', label: 'Félicitations', description: 'Féliciter pour un accomplissement' },
  { id: 'mariage', emoji: '💍', label: 'Demande en mariage', description: 'La question la plus importante' },
  { id: 'reconciliation', emoji: '❤️‍🩹', label: 'Réconciliation', description: 'Renouer après une épreuve' },
];

export const tones: Tone[] = [
  { id: 'romantique', label: 'Romantique', emoji: '🌹' },
  { id: 'touchant', label: 'Touchant', emoji: '💧' },
  { id: 'drôle', label: 'Drôle', emoji: '😄' },
  { id: 'poetique', label: 'Poétique', emoji: '🪶' },
  { id: 'sincere', label: 'Sincère', emoji: '💛' },
  { id: 'elegant', label: 'Élégant', emoji: '✨' },
  { id: 'passionne', label: 'Passionné', emoji: '🔥' },
  { id: 'doux', label: 'Doux', emoji: '🌙' },
];

// ============================================================
// Tone-specific vocabulary
// ============================================================

const toneVocab: Record<string, {
  ouvertures: string[];
  fermetures: string[];
  intensifieurs: string[];
  adjectifs: string[];
  formules: string[];
}> = {
  romantique: {
    ouvertures: ['Mon amour', 'Mon cœur', 'Ma douce', 'Mon doux', 'À toi qui possèdes mon cœur'],
    fermetures: ['Je t\'aime, infiniment', 'Avec tout mon amour', 'Tendrement et éternellement à toi', 'Du plus profond de mon cœur'],
    intensifieurs: ['passionnément', 'tendrement', 'amoureusement', 'de tout mon être'],
    adjectifs: ['tendre', 'enflammé', 'merveilleux', 'inouï'],
    formules: ['avec toute la tendresse du monde', 'les mots du cœur', 'dans la lumière de notre amour'],
  },
  touchant: {
    ouvertures: ['Mon très cher', 'Ma très chère', 'À toi qui me touques si profondément', 'À toi, du fond du cœur'],
    fermetures: ['Avec toute mon émotion', 'Du fond du cœur', 'Avec des larmes de joie', 'Ému jusqu\'aux larmes'],
    intensifieurs: ['profondément', 'intensément', 'immensément', 'comme jamais'],
    adjectifs: ['émouvant', 'profond', 'bouleversant', 'inoubliable'],
    formules: ['avec une émotion vive', 'd\'une sincérité absolue', 'avec le cœur qui bat fort'],
  },
  drôle: {
    ouvertures: ['Coucou toi', 'Hé l\'autre', 'Mon humain préféré', 'Alerte : lettre sincère (promis, je ne rigole pas... enfin presque)'],
    fermetures: ['Gros bisous (pas trop fort quand même)', 'Avec toute ma tendresse rigolarde', 'Bisous de mon cœur drôle', 'Ton(e) fan numéro 1'],
    intensifieurs: ['sérieusement (si, si)', 'sans dec', 'franchement', 'je plaisante même pas'],
    adjectifs: ['génialissime', 'super-mega', 'magnifique', 'trop bien'],
    formules: ['entre nous soit dit', 'sans filtre', 'avec mon charme naturel (enfin j\'espère)'],
  },
  poetique: {
    ouvertures: ['À l\'astre de mes nuits', 'Comme une mélodie qui s\'écrit', 'À l\'horizon de mes pensées', 'Sous la plume du cœur'],
    fermetures: ['En vers et contre tout', 'Comme un poème sans fin', 'À la manière des étoiles, infiniment', 'Dans l\'encre de mes sentiments'],
    intensifieurs: ['comme une symphonie', 'comme un souffle poétique', 'à la manière des saisons', 'tel un refrain'],
    adjectifs: ['luminex', 'mélodieux', 'éclatant', 'celeste'],
    formules: ['en dansant sur les mots', 'sur les ailes de l\'inspiration', 'comme un vers qui se cherche'],
  },
  sincere: {
    ouvertures: ['Cher(e)', 'Mon cher / Ma chère', 'Tout simplement, à toi', 'Sans artifice, pour toi'],
    fermetures: ['Sincèrement', 'Avec toute ma franchise', 'En toute honnêteté', 'Tout simplement, moi'],
    intensifieurs: ['vraiment', 'honnêtement', 'franchement', 'sans détour'],
    adjectifs: ['vrai', 'authentique', 'réel', 'pur'],
    formules: ['sans faux-semblant', 'les yeux dans les yeux', 'd\'une voix claire et sûre'],
  },
  elegant: {
    ouvertures: ['Cher(e)', 'Très cher(e)', 'À la personne la plus distinguée', 'Avec toute ma considération'],
    fermetures: ['Avec la plus grande considération', 'Respectueusement et affectueusement', 'Avec élégance et sentiments', 'Bien à toi'],
    intensifieurs: ['avec raffinement', 'avec distinction', 'avec grâce', 'avec délicatesse'],
    adjectifs: ['remarquable', 'distingué(e)', 'exceptionnel', 'gracieux'],
    formules: ['avec le plus grand soin', 'dans l\'élégance du moment', 'avec une délicatesse toute particulière'],
  },
  passionne: {
    ouvertures: ['Mon feu', 'Ma flamme', 'À toi qui embrases mon âme', 'À toi, ma passion'],
    fermetures: ['Brûlant d\'amour pour toi', 'Avec toute la fureur de mes sentiments', 'Éperdument', 'Avec une passion sans limite'],
    intensifieurs: ['ardemment', 'férocent', 'avec fureur', 'jusqu\'à l\'obsession'],
    adjectifs: ['ardent', 'brûlant', 'incandescent', 'fou'],
    formules: ['dans un élan irrésistible', 'avec toute la force de mon être', 'comme une déflagration'],
  },
  doux: {
    ouvertures: ['Mon nuage', 'Mon calme', 'Doucement, à toi', 'En toute douceur'],
    fermetures: ['En douceur, avec tendresse', 'Doux bisous', 'Avec un sourire tendre', 'Tout en douceur, pour toi'],
    intensifieurs: ['doucement', 'tendrement', 'avec douceur', 'tout en délicatesse'],
    adjectifs: ['doux', 'tendre', 'délicat', 'moelleux'],
    formules: ['comme une brise légère', 'avec la douceur d\'un murmure', 'tout en retenue et en grâce'],
  },
};

// ============================================================
// Letter template banks per category
// ============================================================

interface LetterVariant {
  ouverture: (d: string, e: string) => string;
  paragraphes: (d: string, e: string) => string[];
  fermeture: (d: string, e: string) => string;
}

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
// Helper for potential future use

const letterBanks: Record<string, LetterVariant[]> = {
  amour: [
    {
      ouverture: (d, _e) => `${d},`,
      paragraphes: (d, _e) => [
        `Il y a des mots que l'on garde au fond de soi, des sentiments que l'on chérit en silence. Aujourd'hui, je ne veux plus me taire. J'ai besoin que tu saches ce que tu représentes pour moi.`,
        `Depuis que tu es entré(e) dans ma vie, chaque jour semble plus lumineux. Tu as cette capacité extraordinaire de transformer les moments les plus simples en souvenirs inoubliables. Quand je suis avec toi, le monde s'arrête de tourner, et il ne reste que nous deux.`,
        `Tu es ma première pensée au réveil et mon dernier sourire avant de m'endormir. Chaque battement de mon cœur porte ton nom, ${d}. Tu n'es pas juste quelqu'un dans ma vie — tu es LA personne qui donne un sens à tout le reste.`,
        `Je voulais prendre le temps de t'écrire ces quelques lignes parce que les mots écrits restent, et je veux que tu puisses relire ces mots chaque fois que tu en auras besoin. Tu mérites de savoir à quel point tu comptes.`,
      ],
      fermeture: (d, e) => `Je t'aime, ${d}. Plus qu'hier, moins que demain.\n${e}`,
    },
    {
      ouverture: (d, _e) => `À toi, ${d},`,
      paragraphes: (d, _e) => [
        `Si quelqu'un m'avait dit qu'un jour, une personne pourrait bouleverser toute ma vie simplement en existant, je ne l'aurais pas cru. Et puis tu es arrivé(e), ${d}, et tout a changé.`,
        `Il n'y a pas un seul instant où tu n'es pas dans mes pensées. Ta voix, ton rire, ta façon de me regarder — tout cela est gravé dans ma mémoire comme la plus belle des mélodies. Tu es devenu(e) ma référence, mon point de repère dans ce monde parfois chaotique.`,
        `Aimer quelqu'un comme je t'aime, c'est découvrir chaque jour une nouvelle raison de sourire. C'est se sentir complet pour la première fois. C'est savoir que, quoi qu'il arrive, il y a quelqu'un qui nous attend avec open arms.`,
        `Je ne suis pas parfait(e), loin de là. Mais avec toi, je veux devenir la meilleure version de moi-même. Parce que tu mérites tout, ${d}. Tout l'amour du monde.`,
      ],
      fermeture: (_d, e) => `Pour toujours à toi,\n${e}`,
    },
    {
      ouverture: (d, _e) => `Mon ${d},`,
      paragraphes: (d, _e) => [
        `On dit souvent que l'amour se trouve quand on ne le cherche pas. C'est exactement ce qui s'est passé avec toi. Sans m'en rendre compte, mon cœur t'a choisi, et depuis, il refuse de battre pour qui que ce soit d'autre.`,
        `Chaque moment passé à tes côtés est un trésor que je garde jalousement. Les rires que l'on partage, les silences confortables, les regards complices — tout cela forme la toile de notre histoire, et c'est la plus belle que j'aie jamais connue.`,
        `Tu me donnes le courage d'affronter les jours difficiles et la joie de célébrer les jours heureux. Tu es mon ancre, mon phare, mon refuge, ${d}. Sans toi, les couleurs du monde seraient bien plus pâles.`,
        `Je veux vieillir à tes côtés, compter les rides comme autant de souvenirs partagés, et te dire "je t'aime" chaque matin comme si c'était la première fois.`,
      ],
      fermeture: (d, e) => `Avec tout l'amour dont mon cœur est capable,\n${e}\n(P.S. : C'est beaucoup, ${d}. C'est beaucoup.)`,
    },
  ],

  crush: [
    {
      ouverture: (d, _e) => `${d},`,
      paragraphes: (d, _e) => [
        `Il y a quelque chose que je dois te dire, et j'ai mis du temps à trouver le courage de le faire. Peut-être que ces mots te surprendront, mais je préfère les dire plutôt que de les garder enfermés en moi.`,
        `Chaque fois que je te vois, mon cœur s'emballe un peu. Chaque fois que tu me parles, j'ai l'impression que le monde autour s'efface. Il y a quelque chose en toi, ${d}, qui m'attire irrésistiblement. Ta lumière, ton énergie, cette chose indéfinissable qui fait que je ne peux pas m'empêcher de te regarder.`,
        `Je ne sais pas ce que tu ressens, et c'est sans doute ce qui me terrifie le plus. Mais je sais que ne rien dire serait pire que tout. Alors voilà : tu me plais, ${d}. Vraiment, profondément, sincèrement.`,
        `Si tu ressens la même chose, j'aimerais qu'on se donne une chance. Et si ce n'est pas le cas, je respecterai ta réponse. Mais au moins, tu sauras.`,
      ],
      fermeture: (_d, e) => `En espérant que ces mots résonnent en toi,\n${e}`,
    },
    {
      ouverture: (d, _e) => `Salut ${d},`,
      paragraphes: (d, _e) => [
        `Il paraît qu'il faut parfois savoir prendre des risques. Alors me voilà, en train de t'écrire une lettre que je n'aurais jamais imaginé écrire il y a encore quelques temps.`,
        `Je ne sais pas exactement quand ça a commencé. Peut-être ce jour où ton rire a résonné et que tout autour s'est arrêté. Ou peut-être cette fois où nos regards se sont croisés et où j'ai senti quelque chose d'électrique. Toujours est-il que tu occupes maintenant une place dans mes pensées que je n'arrive pas à ignorer.`,
        `Il y a chez toi une sincérité, une chaleur qui m'attire. Quand tu es là, tout semble plus vivant, plus coloré. J'aimerais apprendre à te connaître davantage, ${d}. Bien plus que ce que permet un simple sourire de passage.`,
        `Je sais que c'est audacieux. Mais la vie est trop courte pour ne pas dire ce que l'on ressent, non ?`,
      ],
      fermeture: (_d, e) => `Avec un peu de courage et beaucoup d'espoir,\n${e}`,
    },
    {
      ouverture: (d, _e) => `À ${d}, que je ne peux plus ignorer,`,
      paragraphes: (d, _e) => [
        `Écrire cette lettre est peut-être l'acte le plus courageux — ou le plus fou — que j'aie jamais fait. Mais il faut que tu saches.`,
        `Tu es cette personne qui illumine une pièce rien qu'en y entrant. Cette personne dont la simple présence suffit à me faire sourire, même sans raison. ${d}, tu es devenu(e) cette pensée récurrente qui m'accompagne du matin au soir.`,
        `Je remarque tout de toi : la façon dont tu plisses les yeux quand tu ris, comment tu t'animes quand tu parles de ce qui te passionne, cette douceur naturelle qui se dégage de toi. Chaque détail est une raison supplémentaire de craquer.`,
        `Alors oui, j'avoue : j'ai un gros crush sur toi. Et j'aimerais tellement que l'on puisse écrire la suite ensemble.`,
      ],
      fermeture: (_d, e) => `En attendant peut-être un signe de toi,\n${e}`,
    },
  ],

  couple: [
    {
      ouverture: (d, _e) => `${d},`,
      paragraphes: (d, _e) => [
        `Il y a des moments dans la vie où l'on sait que quelque chose doit changer. Non pas parce que les choses vont mal, mais justement parce qu'elles vont si bien qu'on veut les officialiser, les crier au monde entier.`,
        `Depuis le temps qu'on se connaît, qu'on partage ces moments, ces rires, ces complicités, j'ai compris quelque chose d'essentiel : je ne t'imagine plus comme un simple chapitre de ma vie. Tu es le livre entier, ${d}.`,
        `Ce que je te demande n'est pas un engagement à la légère. C'est une promesse de construire ensemble, de se soutenir, de rire et de pleurer côte à côte. Je veux être ton(e) partenaire, au sens le plus beau du terme. Je veux qu'on soit un "nous".`,
        `Alors, ${d}, veux-tu qu'on franchisse ce pas ? Qu'on arrête de compter les jours et qu'on commence à construire notre histoire, officiellement, fièrement, ensemble ?`,
      ],
      fermeture: (_d, e) => `Prêt(e) à écrire notre chapitre,\n${e}`,
    },
    {
      ouverture: (d, _e) => `À mon ${d},`,
      paragraphes: (_d, _e) => [
        `On a dansé autour du sujet assez longtemps, tu ne crois pas ? Ces regards qui en disent long, ces moments suspendus où l'on sent que quelque chose de plus grand essaie de naître...`,
        `Je ne veux plus de "peut-être" ni de "on verra". Je veux du "nous", du "ensemble", du "officiel". Pas parce que c'est ce que la société attend de nous, mais parce que c'est ce que mon cœur me crie de faire.`,
        `Avec toi, tout est plus simple et plus beau en même temps. Tu es la personne avec qui je veux partager mes matins et mes soirs, mes victoires et mes doutes. Tu es celle/celui qui rend le quotidien extraordinaire.`,
        `Alors je te le demande, simplement, sincèrement : veux-tu qu'on soit ensemble, pour de vrai, pour du beau, pour du long ?`,
      ],
      fermeture: (_d, e) => `En attendant ta réponse avec impatience,\n${e}`,
    },
    {
      ouverture: (d, _e) => `${d}, mon étoile,`,
      paragraphes: (d, _e) => [
        `Les plus belles histoires commencent souvent par un hasard. La nôtre a commencé comme ça, et aujourd'hui, elle est devenue la chose la plus précieuse de ma vie.`,
        `Il n'y a pas un jour où je ne me réveille pas en pensant à toi. Chaque message, chaque appel, chaque moment partagé renforce ma certitude : tu es la personne avec qui je veux construire quelque chose de durable, de solide, de beau.`,
        `Je ne te demande pas la lune. Je te demande juste de me donner ta main et de marcher à mes côtés. En tant que couple. En tant qu'équipe. En tant que partenaires de cette folle aventure qu'est la vie.`,
        `Dis-moi oui, ${d}, et promettons-nous de rendre chaque jour plus beau que le précédent.`,
      ],
      fermeture: (_d, e) => `Avec tout mon cœur qui espère,\n${e}`,
    },
  ],

  excuses: [
    {
      ouverture: (d, _e) => `${d},`,
      paragraphes: (d, _e) => [
        `Écrire cette lettre n'est pas facile. Mais il y a des choses qu'il faut trouver le courage de dire, même quand elles nous coûtent.`,
        `Je sais que je t'ai blessé(e). Je sais que mes actes ont eu des conséquences, et je n'essaie pas de les minimiser. Ce que j'ai fait était mal, et j'en assume l'entière responsabilité. Il n'y a pas d'excuse valable — juste des regrets sincères.`,
        `${d}, tu comptes trop pour moi pour que je laisse cette distance s'installer entre nous. Je suis sincèrement désolé(e). Pas de la bouche, mais du fond du cœur. Si je pouvais effacer ce qui s'est passé, je le ferais sans hésiter.`,
        `Je ne te demande pas de pardonner tout de suite. Je te demande juste de savoir que je regrette, que je comprends ta douleur, et que je ferai tout pour ne jamais te faire revivre ça. Tu mérites mieux, ${d}, et je veux être cette personne meilleure pour toi.`,
      ],
      fermeture: (_d, e) => `Avec tous mes regrets,\n${e}`,
    },
    {
      ouverture: (d, _e) => `Cher(e) ${d},`,
      paragraphes: (d, _e) => [
        `Il y a des erreurs que l'on fait et qui nous hantent. La mienne, c'est de t'avoir fait du mal. Et pour ça, je suis profondément désolé(e).`,
        `J'ai réagi de manière impulsive, sans penser aux conséquences. Mais ce n'est pas une justification. J'aurais dû réfléchir, écouter, te respecter. Au lieu de ça, je t'ai blessé(e), et ça me ronge depuis.`,
        `Tu es quelqu'un d'exceptionnel, ${d}, et ma plus grande crainte est de t'avoir perdu(e) à jamais. Je ne mérite peut-être pas ton pardon, mais j'aimerais au moins que tu saches que je suis sincèrement navré(e).`,
        `Si tu m'en donnes la chance, je prouverai par mes actes que j'ai appris de cette erreur. Pas avec des promesses, mais avec des faits.`,
      ],
      fermeture: (_d, e) => `En espérant que le temps apaisera tes blessures,\n${e}`,
    },
    {
      ouverture: (d, _e) => `${d}, je t'ai fait du mal,`,
      paragraphes: (d, _e) => [
        `Et pour ça, il n'y a pas de mots assez forts pour exprimer mes regrets. Mais je vais essayer quand même, parce que tu mérites au moins ça.`,
        `Je n'aurais jamais dû agir ainsi. J'aurais dû te considérer, prendre en compte tes sentiments, être là comme tu avais besoin que je le sois. Mon égoïsme a pris le dessus, et tu en as payé le prix. C'est injuste, et je le sais.`,
        `${d}, depuis ce jour, je repense sans cesse à ce qui s'est passé. Je me déteste de t'avoir fait de la peine. Pas un matin ne se lève sans que cette culpabilité ne me rappelle ce que j'ai fait.`,
        `Je ne t'écris pas pour me dédouaner. Je t'écris parce que tu dois savoir que ta douleur est entendue, reconnue, et partagée. Je souffre de t'avoir fait souffrir. Et je ferai tout pour que ça ne se reproduise jamais.`,
      ],
      fermeture: (_d, e) => `Avec une culpabilité sincère et un espoir fragile,\n${e}`,
    },
  ],

  amitie: [
    {
      ouverture: (d, _e) => `Mon ${d},`,
      paragraphes: (d, _e) => [
        `Il y a des rencontres qui changent une vie. La nôtre en fait partie. Ce n'est pas tous les jours qu'on trouve quelqu'un qui comprend nos silences, qui partage nos fous rires et qui reste présent dans les tempêtes.`,
        `Tu es cette personne rare, ${d}. Celle avec qui je peux être moi-même, sans masque, sans filtre. Celle qui ne juge pas, qui écoute, qui accompagne. Notre amitié est un trésor que je chéris chaque jour davantage.`,
        `Je voulais juste prendre un moment pour te dire merci. Merci d'exister, merci d'être là, merci d'être toi. Le monde est meilleur parce que tu en fais partie, et ma vie est plus belle parce que tu y es.`,
        `Qu'importe les kilomètres, le temps qui passe, les hauts et les bas — tu peux toujours compter sur moi, comme je sais que je peux compter sur toi. C'est ça, la magie d'une vraie amitié.`,
      ],
      fermeture: (_d, e) => `Ton(e) ami(e) pour la vie,\n${e}`,
    },
    {
      ouverture: (d, _e) => `${d}, mon complice,`,
      paragraphes: (d, _e) => [
        `Sais-tu qu'on dit souvent qu'on peut compter les vrais amis sur les doigts d'une main ? Eh bien, tu es le pouce, l'index, le majeur, l'annulaire et l'auriculaire. Bref, tu es toute ma main. Et sans les mains, on ne peut pas serrer quelqu'un dans ses bras.`,
        `Blague à part, notre amitié est l'un des plus beaux cadeaux que la vie m'ait offerts. Nos délires, nos conversations à n'en plus finir, nos aventures improbables — chaque moment avec toi est un moment de pur bonheur.`,
        `${d}, tu es la personne à qui je confie mes rêves et mes doutes. Tu es celle/celui qui me fait rire quand j'en ai le plus besoin, qui me relève quand je tombe, qui croit en moi quand même moi j'ai du mal.`,
        `Je voulais que ça soit écrit noir sur blanc : tu comptes énormément pour moi. Et rien ne pourra jamais changer ça.`,
      ],
      fermeture: (_d, e) => `Avec toute mon amitié,\n${e}`,
    },
    {
      ouverture: (d, _e) => `À ${d},`,
      paragraphes: (d, _e) => [
        `Il y a des amitiés qui traversent le temps sans jamais s'effacer. La nôtre est de celles-là. Et pour ça, je suis infiniment reconnaissant(e).`,
        `Tu es bien plus qu'un(e) ami(e) — tu es une soeur/un frère de cœur. Quelqu'un qui comprend sans qu'on ait besoin d'expliquer, qui sourit quand le monde est gris, qui reste quand tout le monde part.`,
        `Nos souvenirs communs sont autant de pépites que je garde précieusement. Chaque éclat de rire, chaque larme essuyée, chaque défi relevé ensemble — tout cela forme le tissu de notre lien, et ce tissu est solide, ${d}.`,
        `Je voulais juste te le rappeler aujourd'hui : tu es important(e), tu comptes, et notre amitié est l'une des choses les plus précieuses que j'ai.`,
      ],
      fermeture: (_d, e) => `À jamais ton(a) ami(e),\n${e}`,
    },
  ],

  anniversaire: [
    {
      ouverture: (d, _e) => `Joyeux anniversaire, ${d} !`,
      paragraphes: (d, _e) => [
        `Aujourd'hui est un jour spécial, car c'est le jour où le monde a eu la chance de t'accueillir. Et quelle chance c'est ! Chaque année, cet anniversaire me rappelle à quel point ta présence est un cadeau pour tous ceux qui te connaissent.`,
        `${d}, tu apportes de la lumière partout où tu vas. Ton énergie, ta générosité, ta joie de vivre — tout cela contamine les gens de la plus belle des manières. Aujourd'hui, c'est à ton tour de recevoir tout l'amour que tu dispenses aux autres.`,
        `Que cette nouvelle année de ta vie t'apporte tout ce que ton cœur désire. Des rires, des rêves réalisés, des rencontres merveilleuses, et surtout, du bonheur. Tu le mérites, ${d}, plus que quiconque.`,
        `J'espère que cette journée sera à la hauteur de la personne extraordinaire que tu es. Et n'oublie pas : vieillir, c'est devenir une version encore plus incroyable de soi-même.`,
      ],
      fermeture: (_d, e) => `Avec tout mon amour et mes vœux les plus chers,\n${e}`,
    },
    {
      ouverture: (d, _e) => `${d}, aujourd'hui c'est TON jour !`,
      paragraphes: (d, _e) => [
        `Un an de plus sur le compteur, un an de plus de souvenirs incroyables, un an de plus de sagesse (enfin, on espère 😄). Mais surtout, un an de plus à avoir la chance de t'avoir dans notre vie !`,
        `Tu sais ce que j'admire chez toi, ${d} ? Ta capacité à rendre chaque instant spécial. Que ce soit une soirée entre amis ou un simple café, tu as ce talent pour transformer l'ordinaire en extraordinaire.`,
        `Pour cette nouvelle année, je te souhaite de continuer à briller, à oser, à rêver grand. Je te souhaite des matins lumineux et des soirs étoilés. Je te souhaite des éclats de rire qui font pleurer et des silences qui font du bien.`,
        `Tu es une personne unique, ${d}, et le monde a besoin de plus de gens comme toi. Alors continue d'être toi, tout simplement.`,
      ],
      fermeture: (_d, e) => `Gros bisous d'anniversaire !\n${e}`,
    },
    {
      ouverture: (d, _e) => `À ${d}, en ce jour si particulier,`,
      paragraphes: (d, _e) => [
        `Les anniversaires sont ces moments où le temps semble suspendre son vol, où l'on s'arrête un instant pour célébrer une vie — la tienne. Et quelle vie, ${d} !`,
        `Chaque ride sur le visage du temps est une histoire que tu as écrite, un sourile que tu as offert, un obstacle que tu as surmonté. Ton parcours est inspirant, et je suis fier/fière de pouvoir le célébrer à tes côtés.`,
        `Que cette année nouvelle te porte vers des horizons encore plus beaux. Que chaque saison t'apporte sa part de merveilles. Que tes rêves se réalisent un par un, comme des bougies que l'on souffle avec le cœur.`,
        `Joyeux anniversaire, ${d}. Puisses-tu recevoir aujourd'hui tout l'amour que tu mérites.`,
      ],
      fermeture: (_d, e) => `Avec toute mon affection,\n${e}`,
    },
  ],

  remerciement: [
    {
      ouverture: (d, _e) => `${d},`,
      paragraphes: (d, _e) => [
        `Il y a des gestes, des mots, des présences qui changent tout. Et toi, ${d}, tu as été de ceux-là. C'est pourquoi je voulais t'écrire ces quelques mots de gratitude.`,
        `Ce que tu as fait pour moi ne sera jamais oublié. Dans un moment où j'en avais besoin, tu étais là. Sans hésitation, sans compter. C'est rare, c'est précieux, et je veux que tu saches à quel point je l'apprécie.`,
        `Les mots "merci" semblent parfois bien petits face à la grandeur d'un acte de générosité. Mais ils portent en eux toute ma sincérité et toute ma reconnaissance. Merci, ${d}, du fond du cœur.`,
        `Sache que je serai toujours là pour toi en retour. C'est la moindre des choses, et c'est aussi ce que mon cœur me dicte. Les personnes comme toi méritent d'être entourées et chéries.`,
      ],
      fermeture: (_d, e) => `Avec toute ma gratitude,\n${e}`,
    },
    {
      ouverture: (d, _e) => `Cher(e) ${d},`,
      paragraphes: (d, _e) => [
        `On dit souvent qu'on ne réalise la valeur des gens qu'une fois qu'ils ne sont plus là. Mais toi, ${d}, j'ai conscience de ta valeur chaque jour. Et aujourd'hui, je veux te le dire.`,
        `Merci pour ta bienveillance, ton écoute, ton soutien infaillible. Merci d'être cette personne sur qui on peut compter, cette lumière qui guide quand la nuit est trop sombre. Le monde a besoin de gens comme toi.`,
        `Tu as touché ma vie d'une manière que les mots peinent à décrire. Mais je vais essayer quand même : tu m'as donné de l'espoir quand je n'en avais plus, du courage quand je vacillais, et un sourire quand tout semblait gris.`,
        `Alors merci, ${d}. Merci d'être toi, tout simplement.`,
      ],
      fermeture: (_d, e) => `Reconnaissant(e) à jamais,\n${e}`,
    },
    {
      ouverture: (d, _e) => `À toi, ${d},`,
      paragraphes: (d, _e) => [
        `La gratitude est l'un des plus beaux sentiments que l'on puisse exprimer. Et aujourd'hui, c'est celui qui remplit mon cœur quand je pense à toi.`,
        `Tu as fait plus que ce que tu crois. Un geste qui te semblait anodin a eu des répercussions immenses dans ma vie. Une parole, un sourire, une aide — tout cela a compté, et tout cela m'a aidé(e) à avancer.`,
        `Je voulais que tu saches que rien n'est pris pour acquis. Chaque acte de bonté de ta part a été reçu avec gratitude et humility. Tu es une personne exceptionnelle, ${d}, et je suis chanceux/se de t'avoir dans ma vie.`,
        `Merci, du plus profond de mon être. Et si un jour tu as besoin de moi, sois certain(e) que je serai là, sans hésiter.`,
      ],
      fermeture: (_d, e) => `Avec un cœur rempli de gratitude,\n${e}`,
    },
  ],

  revoir: [
    {
      ouverture: (d, _e) => `${d},`,
      paragraphes: (d, _e) => [
        `Dire au revoir n'est jamais facile. C'est un mot qui pèse lourd sur le cœur, mais qu'il faut parfois trouver le courage de prononcer.`,
        `Les moments passés ensemble resteront gravés dans ma mémoire. Chaque rire, chaque conversation, chaque silence partagé — tout cela fait partie de moi désormais. Tu as laissé une empreinte indélébile dans ma vie, ${d}.`,
        `Ce n'est pas un adieu. C'est un "à bientôt". Car même si nos chemins se séparent, les liens que nous avons tissés ne s'effaceront pas. La distance ne peut rien contre une connexion sincère.`,
        `Je te souhaite tout le bonheur du monde là où tu vas. Que tes rêves se réalisent, que les étoiles te guident, et que tu trouves tout ce que tu cherches. Tu le mérites, ${d}.`,
      ],
      fermeture: (_d, e) => `À très vite, j'espère,\n${e}`,
    },
    {
      ouverture: (d, _e) => `Mon ${d},`,
      paragraphes: (d, _e) => [
        `Le temps est venu de se dire au revoir. Et même si je sais que c'est pour le mieux, ça ne rend pas les choses plus faciles.`,
        `Tu as été bien plus qu'un(e) simple connaissance. Tu as été un pilier, un repère, une présence réconfortante. Les jours passés à tes côtés comptent parmi les plus beaux de mon histoire, ${d}.`,
        `Je ne vais pas te mentir : tu vas me manquer. Énormément. Tes blagues, tes conseils, ta simple présence. Mais je sais aussi que la vie nous réserve encore de belles surprises, et que nos routes se croiseront à nouveau.`,
        `En attendant, prends soin de toi. Sois heureux/se, sois fort(e), sois toi — c'est déjà tellement. Et n'oublie jamais que quelqu'un, quelque part, pense à toi avec tendresse.`,
      ],
      fermeture: (_d, e) => `Avec tout mon attachement,\n${e}`,
    },
    {
      ouverture: (d, _e) => `À ${d}, avant de partir,`,
      paragraphes: (d, _e) => [
        `Il y a des au revoir qui résonnent comme des pages qui se tournent. Celui-ci en est un. Mais quelle page magnifique ce fut.`,
        `Chaque chapitre de notre histoire commune mériterait d'être relu encore et encore. Les éclats de rire, les défis surmontés, les rêves partagés — tout cela forme un récit dont je suis fier/fière. Et tu en es le héros/l'héroïne, ${d}.`,
        `Le monde est grand, mais les cœurs qui se comprennent se retrouvent toujours. C'est ce que je me répète pour apaiser la tristesse de cette séparation.`,
        `Pars la tête haute, ${d}. Le meilleur est devant toi. Et sache que, peu importe la distance, tu auras toujours un allié en moi.`,
      ],
      fermeture: (_d, e) => `Jusqu'à notre prochaine rencontre,\n${e}`,
    },
  ],

  'saint-valentin': [
    {
      ouverture: (d, _e) => `Mon ${d}, en ce jour de la Saint-Valentin,`,
      paragraphes: (d, _e) => [
        `Aujourd'hui, le monde célèbre l'amour. Et moi, je célèbre la plus belle chose qui me soit arrivée : toi.`,
        `La Saint-Valentin est souvent vue comme une fête commerciale, mais pour moi, c'est bien plus que ça. C'est une occasion de te rappeler à quel point tu comptes, de te dire ces mots que l'on oublie parfois au quotidien, de célébrer ce lien unique qui nous unit.`,
        `${d}, tu es la rose de mon jardin, l'étoile de ma nuit, la mélodie de mon cœur. Chaque jour à tes côtés est une fête de l'amour, mais aujourd'hui, je veux en faire un jour exceptionnel.`,
        `Je t'aime. De ces trois mots qui portent tout le poids du monde et toute la légèreté du bonheur. Je t'aime hier, aujourd'hui, et tous les jours qui suivront.`,
      ],
      fermeture: (_d, e) => `Heureuse Saint-Valentin, mon amour,\n${e}`,
    },
    {
      ouverture: (d, _e) => `À mon amour, ${d},`,
      paragraphes: (d, _e) => [
        `En ce 14 février, je ne pouvais pas laisser passer l'occasion de t'écrire. Pas un message rapide, pas un simple cadeau — une vraie lettre, écrite avec le cœur, pour te dire ce que tu représentes pour moi.`,
        `Il y a toi avant la Saint-Valentin, toi pendant, et toi après. Parce que l'amour que je te porte ne se mesure pas à une date sur le calendrier. Mais aujourd'hui, je veux le célébrer avec grâce et intensité.`,
        `Tu es ma Valentine tous les jours de l'année. Chaque matin où je me réveille à tes côtés est un 14 février. Chaque sourire que tu m'offres est un bouquet de roses. Chaque "je t'aime" murmuré est une déclaration solennelle.`,
        `Alors ce soir, levons nos verres à nous, à notre histoire, à notre avenir. La plus belle des Saint-Valentin, c'est celle passée avec toi, ${d}.`,
      ],
      fermeture: (_d, e) => `Avec tout mon amour, aujourd'hui et toujours,\n${e}`,
    },
    {
      ouverture: (d, _e) => `${d}, ma Valentine,`,
      paragraphes: (d, _e) => [
        `Les poètes ont chanté l'amour pendant des siècles. Les artistes l'ont peint, les musiciens l'ont joué, les amoureux l'ont vécu. Aujourd'hui, c'est mon tour d'ajouter ma voix à ce chœur éternel.`,
        `En cette journée dédiée à l'amour, je veux te dire que tu es la plus belle preuve que l'amour existe. Pas l'amour des contes de fées — l'amour vrai, celui qui se construit, qui se cultive, qui résiste. Celui qui rend meilleur, plus fort, plus heureux.`,
        `${d}, chaque jour je choisis de t'aimer. C'est le choix le plus facile et le plus beau que j'aie jamais fait. Tu es ma certitude dans un monde d'incertitudes.`,
        `Joyeuse Saint-Valentin, mon cœur. Que cette journée soit à la hauteur de l'amour infini que je te porte.`,
      ],
      fermeture: (_d, e) => `Éperdument à toi,\n${e}`,
    },
  ],

  felicitations: [
    {
      ouverture: (d, _e) => `${d},`,
      paragraphes: (d, _e) => [
        `Quelque chose d'extraordinaire vient de se produire, et je ne pouvais pas rester sans te l'écrire : félicitations !`,
        `Tu as accompli quelque chose de remarquable, ${d}. Et honnêtement, ce n'est pas une surprise pour moi. Tu as toujours eu cette détermination, cette force de caractère qui fait que les impossibles deviennent possibles entre tes mains.`,
        `Ce succès est le fruit de ton travail, de ta persévérance, de ton courage. Chaque effort, chaque sacrifice, chaque moment de doute que tu as surmonté t'a mené(e) jusqu'ici. Et tu peux en être fier/fière. Très fier/fière.`,
        `Je suis tellement heureux/se de pouvoir célébrer cette victoire avec toi. Tu le mérites, ${d}, et je suis convaincu(e) que ce n'est que le début d'une longue série de réussites.`,
      ],
      fermeture: (_d, e) => `Avec toute ma fierté et ma joie,\n${e}`,
    },
    {
      ouverture: (d, _e) => `Bravo, ${d} !`,
      paragraphes: (d, _e) => [
        `Quand on a un objectif en tête, rien ne peut nous arrêter. Et toi, ${d}, tu viens de le prouver de manière éclatante !`,
        `Félicitations pour cette réussite ! Ce n'est pas le fruit du hasard — c'est le résultat de ton travail acharné, de ta passion et de ta résilience. Tu as su transformer tes rêves en réalité, et c'est tout simplement inspirant.`,
        `Je voulais prendre un moment pour te dire à quel point je suis fier/fière de toi. Ton parcours force le respect, et cette réalisation en est la preuve éclatante. Continue à croire en toi, car tu es capable de choses incroyables.`,
        `Le monde a besoin de personnes comme toi, ${d}. Des personnes qui osent, qui persévèrent, qui ne renoncent jamais. Tu es un exemple pour moi et pour beaucoup d'autres.`,
      ],
      fermeture: (_d, e) => `Avec admiration,\n${e}`,
    },
    {
      ouverture: (d, _e) => `À ${d}, qui vient de réaliser l'exceptionnel,`,
      paragraphes: (d, _e) => [
        `Il y a des accomplissements qui méritent d'être célébrés avec éclat. Le tien en fait partie, ${d}.`,
        `Derrière cette réussite, il y a des nuits blanches, des doutes surmontés, des efforts invisibles. Il y a toi, tout simplement, avec ta détermination inébranlable et ton refus d'abandonner. C'est admirable, et ça mérite d'être souligné.`,
        `Aujourd'hui, prends le temps de savourer. De ressentir cette fierté légitime qui t'envahit. De regarder le chemin parcouru et de te dire : "Je l'ai fait." Parce que oui, tu l'as fait, ${d}. Et c'est magnifique.`,
        `Je lève mon verre à ton succès, et à tous ceux qui suivront. Car je le sais : ce n'est qu'un début.`,
      ],
      fermeture: (_d, e) => `Avec une fierté immense,\n${e}`,
    },
  ],

  mariage: [
    {
      ouverture: (d, _e) => `Mon ${d},`,
      paragraphes: (d, _e) => [
        `Il y a des questions qui changent une vie. Celle que je m'apprête à te poser en est une. Mais avant, laisse-moi te dire pourquoi.`,
        `Depuis que tu es entré(e) dans ma vie, chaque jour a pris un sens nouveau. J'ai découvert ce que c'était d'aimer vraiment, profondément, sans réserve. Tu as transformé mon monde, ${d}, et je ne veux plus jamais vivre sans toi.`,
        `Je veux te voir sourire chaque matin. Je veux essuyer tes larmes les jours difficiles. Je veux construire un foyer, une histoire, une vie entière à tes côtés. Je veux que chaque "demain" se passe avec toi, et que chaque "toujours" rime avec "nous".`,
        `${d}, veux-tu me faire l'honneur de devenir mon époux/mon épouse ? Veux-tu qu'on se promette pour la vie, devant ceux qu'on aime, et qu'on commence ce chapitre le plus beau de notre histoire ?`,
      ],
      fermeture: (_d, e) => `À genoux devant toi, le cœur grand ouvert,\n${e}`,
    },
    {
      ouverture: (d, _e) => `À l'amour de ma vie, ${d},`,
      paragraphes: (d, _e) => [
        `Les plus belles histoires d'amour sont celles qui durent. La nôtre a déjà traversé des montagnes, survolé des océans, dansé sous les étoiles. Et maintenant, je veux lui donner le cadre le plus beau qui soit.`,
        `Je ne t'écris pas cette lettre à la légère. C'est le fruit de nuits de réflexion, de matins où je me réveille avec la certitude absolue : c'est toi. C'est toi pour les matins grisonnants et les soirs étoilés, pour les rires et les larmes, pour tout.`,
        `${d}, je veux vieillir à tes côtés. Je veux que nos rides se dessinent en même temps, que nos cheveux blancs brillent sous le même soleil. Je veux que notre histoire devienne une légende que l'on racontera.`,
        `Alors je te le demande, avec tout l'amour dont je suis capable : veux-tu m'épouser ?`,
      ],
      fermeture: (_d, e) => `En attendant ton "oui" avec tout mon être,\n${e}`,
    },
    {
      ouverture: (d, _e) => `${d}, mon âme sœur,`,
      paragraphes: (d, _e) => [
        `Il y a des rencontres qui bouleversent une existence. D'autres qui la transcendent. La tienne a fait les deux, ${d}. Et aujourd'hui, je veux sceller ce qui est déjà évident dans mon cœur.`,
        `Avec toi, j'ai appris ce que signifie aimer sans condition. J'ai compris que le bonheur n'est pas une destination mais un chemin, et que ce chemin est infiniment plus beau quand on le parcourt main dans la main.`,
        `Je te promets mes matins et mes soirs, mes forces et mes vulnérabilités, mes rêves et mes réalité. Je te promets de t'aimer quand ce sera facile et surtout quand ce sera difficile. Je te promets de choisir "nous" chaque jour qui se lève.`,
        `${d}, veux-tu me marier ? Veux-tu qu'on écrive ensemble la plus belle des promesses, celle de se choisir pour toujours ?`,
      ],
      fermeture: (_d, e) => `Avec un cœur qui n'appartient qu'à toi,\n${e}`,
    },
  ],

  reconciliation: [
    {
      ouverture: (d, _e) => `${d},`,
      paragraphes: (d, _e) => [
        `Il y a des distances qui se mesurent en mots non dits, en silences qui s'installent, en fierté qui isole. La nôtre a duré trop longtemps, et je ne veux plus la laisser grandir.`,
        `Je sais que les choses se sont abîmées entre nous. Il y a eu des blessures, des malentendus, des moments où l'on aurait dû se parler et où l'on a choisi le silence. Mais aujourd'hui, je choisis les mots. Je choisis toi, ${d}.`,
        `Notre lien est trop précieux pour le laisser se fracasser contre le mur de l'obstination. Tu comptes trop pour moi. Les souvenirs que nous partageons valent plus que tous les différends du monde.`,
        `Je te tends la main, ${d}. Pas pour effacer le passé, mais pour construire l'avenir. Veux-tu la prendre ?`,
      ],
      fermeture: (_d, e) => `Avec l'espoir d'un nouveau départ,\n${e}`,
    },
    {
      ouverture: (d, _e) => `Cher(e) ${d},`,
      paragraphes: (d, _e) => [
        `Le silence entre nous est devenu assourdissant. Et je ne supporte plus de l'entendre. Alors je prends ma plume, et mon courage, pour te dire ce qui me tient à cœur.`,
        `Je regrette ce qui s'est passé entre nous. Je regrette chaque mot dur, chaque silence blessant, chaque occasion manquée de tendre la main. Si je pouvais revenir en arrière, je ferais les choses différemment. Mais je ne peux pas. En revanche, je peux agir maintenant.`,
        `${d}, notre histoire mérite mieux que cette fin provisoire. Nous avons traversé tant de choses ensemble — des rires, des larmes, des défis, des victoires. Tout cela ne peut pas disparaître comme si de rien n'était.`,
        `Je suis prêt(e) à écouter, à comprendre, à pardonner. Et je demande la même ouverture en retour. Parce qu'ensemble, on est plus fort(e)s que n'importe quel obstacle.`,
      ],
      fermeture: (_d, e) => `Dans l'attente d'un dialogue renoué,\n${e}`,
    },
    {
      ouverture: (d, _e) => `${d}, il est temps,`,
      paragraphes: (d, _e) => [
        `Le temps passe, les plaies se referment, et un jour on se réveille en réalisant que ce qui comptait le plus nous a échappé. Je ne veux pas que ce jour arrive, ${d}.`,
        `On s'est blessés, c'est vrai. On a laissé la colère parler à la place du cœur. Mais la colère est passagère, tandis que ce que nous partageons est permanent. Du moins, c'est ce que je veux croire.`,
        `Je t'écris aujourd'hui parce que tu me manques. Pas seulement ta présence, mais tout : nos conversations, nos complicités, la simplicité de notre relation. Rien de tout cela n'a perdu sa valeur à mes yeux.`,
        `Je ne te demande pas d'oublier. Je te demande de me redonner une chance. Parce que certaines choses méritent d'être réparées, ${d}. Et nous en faisons partie.`,
      ],
      fermeture: (_d, e) => `Avec un cœur qui espère et des bras ouverts,\n${e}`,
    },
  ],
};

// ============================================================
// Letter generation engine
// ============================================================

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function replaceNamePlaceholders(text: string, destinataire: string, expediteur: string): string {
  return text
    .replace(/\{destinataire\}/g, destinataire)
    .replace(/\{expediteur\}/g, expediteur);
}

export function generateLetter(
  categoryId: string,
  toneId: string,
  destinataire: string,
  expediteur: string
): string {
  const dest = capitalize(destinataire.trim());
  const exp = capitalize(expediteur.trim());

  // Get letter variants for this category
  const variants = letterBanks[categoryId];
  if (!variants || variants.length === 0) {
    return `Cher(e) ${dest},\n\nCette lettre vous est adressée avec toute notre sincérité.\n\n${exp}`;
  }

  // Pick a random variant
  const variant = pick(variants);

  // Get tone vocabulary
  const tone = toneVocab[toneId] || toneVocab['sincere'];

  // Build the letter
  const ouverture = replaceNamePlaceholders(variant.ouverture(dest, exp), dest, exp);

  const paragraphes = variant.paragraphes(dest, exp)
    .map(p => replaceNamePlaceholders(p, dest, exp));

  // Inject tone-specific phrases into paragraphs
  const enrichedParagraphes = paragraphes.map((p, i) => {
    // Add tone formula to a middle paragraph
    if (i === 1 && tone.formules.length > 0) {
      const formula = pick(tone.formules);
      return `${p} ${capitalize(formula)}.`;
    }
    // Add tone intensifier to another paragraph
    if (i === 2 && tone.intensifieurs.length > 0 && !p.includes(tone.intensifieurs[0])) {
      const intensifieur = pick(tone.intensifieurs);
      // Find a good place to inject - after a comma or period
      const lastPeriod = p.lastIndexOf('.');
      if (lastPeriod > p.length * 0.5) {
        const adjective = pick(tone.adjectifs);
        return p.slice(0, lastPeriod) + ` ${intensifieur} ${adjective}.` + p.slice(lastPeriod + 1);
      }
    }
    return p;
  });

  const fermeture = replaceNamePlaceholders(variant.fermeture(dest, exp), dest, exp);

  // Compose the final letter with tone-specific greeting style
  const greeting = capitalize(pick(tone.ouvertures));

  const letter = `${greeting},\n\n${ouverture}\n\n${enrichedParagraphes.join('\n\n')}\n\n${fermeture}`;

  return letter;
}

// ============================================================
// Date formatting
// ============================================================

export function formatDate(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = now.toLocaleDateString('fr-FR', options);
  return capitalize(date);
}
