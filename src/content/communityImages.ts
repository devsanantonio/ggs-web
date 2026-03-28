export type CommunityImage = {
  src: string;
  alt: string;
};

export type CommunityImageGroup = {
  label: string;
  images: CommunityImage[];
};

function hashString(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

function getDayOffset(dayKey: string) {
  const [year, month, day] = dayKey.split("-").map(Number);
  const utcTime = Date.UTC(year, month - 1, day);

  return Math.floor(utcTime / (24 * 60 * 60 * 1000));
}

function pickUniqueVariant(
  items: CommunityImage[],
  dayKey: string,
  salt: string,
  usedSources: Set<string>,
) {
  const startIndex = (getDayOffset(dayKey) + hashString(salt)) % items.length;

  for (let offset = 0; offset < items.length; offset += 1) {
    const candidate = items[(startIndex + offset) % items.length];

    if (!usedSources.has(candidate.src)) {
      usedSources.add(candidate.src);
      return candidate;
    }
  }

  const fallback = items[startIndex];

  usedSources.add(fallback.src);

  return fallback;
}

export const heroSpotlightImages: CommunityImage[] = [
  {
    src: "/reference/community-pictures/ggs-geekdom-ribbon.jpg",
    alt: "Greater Gaming Society ribbon-cutting event at Geekdom",
  },
  {
    src: "/reference/community-pictures/ggj25-host.jpg",
    alt: "Greater Gaming Society host speaking to an audience",
  },
  {
    src: "/reference/community-pictures/ggs-geekdom-stage-panel.jpg",
    alt: "Greater Gaming Society speakers on stage at a San Antonio event",
  },
  {
    src: "/reference/community-pictures/ggj25-host.jpg",
    alt: "Global Game Jam host addressing attendees in San Antonio",
  },
  {
    src: "/reference/community-pictures/ggj-game-couple.jpg",
    alt: "Golbal Game Jam presenting to the crowd",
  },
  {
    src: "/reference/community-pictures/ggs-geekdom-participants.jpg",
    alt: "SASW gaming summit participants gathered at Geekdom",
  },
  {
    src: "/reference/community-pictures/ggs-tabling.jpg",
    alt: "Greater Gaming Society tabling at a event",
  },
];

export const communityImageGroups: CommunityImageGroup[] = [
  {
    label: "SASW Gaming Summit",
    images: [
      {
        src: "/reference/community-pictures/ggs-geekdom-ribbon.jpg",
        alt: "Greater Gaming Society ribbon-cutting photo at Geekdom",
      },
      {
        src: "/reference/community-pictures/ggs-geekdom-stage-panel.jpg",
        alt: "Greater Gaming Society panel on stage at Geekdom",
      },
      {
        src: "/reference/community-pictures/ggs-geekdom-state-of-game-dev.jpg",
        alt: "Gaming Summit presentation about game development in San Antonio",
      },
    ],
  },
  {
    label: "Community meetup",
    images: [
      {
        src: "/reference/community-pictures/ggs-meetup.jpg",
        alt: "Greater Gaming Society meetup in San Antonio",
      },
      {
        src: "/reference/community-pictures/ggs-meetup2.jpg",
        alt: "Greater Gaming Society meetup group photo",
      },
      {
        src: "/reference/community-pictures/ggs-meetup3.jpg",
        alt: "Greater Gaming Society meetup attendees chatting",
      },
      {
        src: "/reference/community-pictures/ggs-meetup4.jpg",
        alt: "Greater Gaming Society meetup event photo",
      },
      {
        src: "/reference/community-pictures/tournament-crowd.jpg",
        alt: "Greater Gaming Society crowd at a tournament event in San Antonio",
      },
    ],
  },
  {
    label: "Global Game Jam",
    images: [
      {
        src: "/reference/community-pictures/ggj25-presentations.jpg",
        alt: "Global Game Jam presentation photo in San Antonio",
      },
      {
        src: "/reference/community-pictures/ggj25-presentations2.jpg",
        alt: "Global Game Jam team presentation at St. Mary's University",
      },
      {
        src: "/reference/community-pictures/ggj25-presentations3.jpg",
        alt: "Global Game Jam participants presenting projects",
      },
      {
        src: "/reference/community-pictures/ggj25-team.jpg",
        alt: "Global Game Jam team photo with San Antonio participants",
      },
      {
        src: "/reference/community-pictures/ggj25-builder.jpg",
        alt: "Global Game Jam builder working on a project",
      },
      {
        src: "/reference/community-pictures/ggj-game-host.jpg",
        alt: "Global Game Jam host speaking to attendees",
      },
      {
        src: "/reference/community-pictures/ggj-game-host.jpg",
        alt: "Global Game Jam host speaking to attendees",
      },
    ],
  },
  {
    label: "Panels and talks",
    images: [
      {
        src: "/reference/community-pictures/ggs-geekdom-panel.jpg",
        alt: "Greater Gaming Society panel at Geekdom",
      },
      {
        src: "/reference/community-pictures/ggs-geekdom-panel-crowd.jpg",
        alt: "Audience listening to a Greater Gaming Society panel",
      },
      {
        src: "/reference/community-pictures/ggs-geekdom-casual-panel.jpg",
        alt: "Panel conversation during a Greater Gaming Society event",
      },
      {
        src: "/reference/community-pictures/ggj-game-speakers-panel.jpg",
        alt: "Global Game Jam speakers panel with local attendees",
      },
    ],
  },
  {
    label: "People and projects",
    images: [
      {
        src: "/reference/community-pictures/ggs-geekdom-tablers.jpg",
        alt: "Greater Gaming Society tables featuring local projects",
      },
      {
        src: "/reference/community-pictures/ggs-geekdom-tablers2.jpg",
        alt: "Local creators sharing projects at a Greater Gaming Society event",
      },
      {
        src: "/reference/community-pictures/ggs-geekdom-game-pitch.jpg",
        alt: "Speaker pitching a game project at a San Antonio event",
      },
      {
        src: "/reference/community-pictures/ggj-game-makers.jpg",
        alt: "Game makers collaborating during Global Game Jam",
      },
    ],
  },
  {
    label: "Community energy",
    images: [
      {
        src: "/reference/community-pictures/ggs-geekdom-crowd.jpg",
        alt: "Crowd gathered at a Greater Gaming Society event",
      },
      {
        src: "/reference/community-pictures/ggs-geekdom-crowd-back.jpg",
        alt: "Audience watching a Greater Gaming Society presentation",
      },
      {
        src: "/reference/community-pictures/ggj25-crowd.jpg",
        alt: "Global Game Jam attendees gathered together in San Antonio",
      },
      {
        src: "/reference/community-pictures/tournament-crowd.jpg",
        alt: "Tournament crowd at a local gaming event",
      },
    ],
  },
];

export function getDailyCommunitySelection(dayKey: string) {
  const usedSources = new Set<string>();
  const heroSpotlight = pickUniqueVariant(
    heroSpotlightImages,
    dayKey,
    "hero-spotlight",
    usedSources,
  );
  const reelSlides = communityImageGroups.map((group) => ({
    label: group.label,
    ...pickUniqueVariant(group.images, dayKey, group.label, usedSources),
  }));

  return {
    heroSpotlight,
    reelSlides,
  };
}
