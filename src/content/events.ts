export type EventStatus = "upcoming" | "past" | "cancelled";

export type Event = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  externalUrl: string;
  status: EventStatus;
};

export const events: Event[] = [
  {
    title: "Greater Gaming Society Monthly Meetup",
    date: "Third Thursday of each month",
    time: "7:00 PM",
    location: "San Antonio, Texas",
    description:
      "A recurring community meetup for local game developers, players, students, and creatives to connect, share work, and build relationships.",
    externalUrl:
      "https://www.meetup.com/greater-gaming-society-of-san-antonio/",
    status: "upcoming",
  },
  {
    title: "Community Networking Night",
    date: "Seasonal community event",
    time: "Evening schedule varies",
    location: "Partner venues around San Antonio",
    description:
      "A flexible event format focused on networking, conversation, and highlighting the people helping grow the local game community.",
    externalUrl: "https://www.facebook.com/greatergamingsociety",
    status: "upcoming",
  },
];
