import { PageTitle, Checkbox, VideoPlayer } from "ui";
import dayjs from "dayjs";
import { rrulestr } from "rrule";

const ListItem = ({ name, src }) => {
  return (
    <div className="px-4 py-3">
      <div className="flex justify-center items-center flex-col">
        <h4 className="pb-4">{name}</h4>
        <VideoPlayer src={src} />
        {/*
        <fieldset>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <Checkbox name="day" value={day} key={day}>
              {day}
            </Checkbox>
          ))}
        </fieldset>
        */}
      </div>
    </div>
  );
};

export default function Home() {
  const resources = [
    {
      type: "video",
      name: "8 mins abs workout",
      src: "//www.youtube-nocookie.com/embed/W-9L0J_9qag",
      rrule: "RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR",
    },
    {
      type: "video",
      name: "Sunrise Yoga | Yoga With Adriene",
      src: "//www.youtube-nocookie.com/embed/r7xsYgTeM2Q",
      duration: 933,
      rrule: "RRULE:FREQ=WEEKLY;BYDAY=TU",
    },
    {
      type: "video",
      name: "Yoga For Upper Body Strength | Yoga With Adriene",
      src: "//www.youtube-nocookie.com/embed/7agiIk9KgyI",
      duration: 786,
      rrule: "",
    },
    {
      type: "video",
      name: "Yoga For Runners - Physical & Mental Stamina | Yoga With Adriene",
      src: "//www.youtube-nocookie.com/embed/plL13JF5BHA",
      duration: 1219,
      rrule: "",
    },
    {
      type: "video",
      name: "Take 5 Yoga Break! | Yoga Quickies | Yoga With Adriene",
      src: "//www.youtube-nocookie.com/embed/nQFf38xeBww",
      duration: 363,
      rrule: "",
    },
    {
      type: "video",
      name: "Office Break Yoga | 14 Min. Yoga Practice | Yoga With Adriene",
      src: "//www.youtube-nocookie.com/embed/M-8FvC3GD8c",
      duration: 859,
      rrule: "RRULE:FREQ=WEEKLY;BYDAY=TH",
    },
    {
      type: "video",
      name: "Wind Down Yoga - 12 Minute Bedtime Yoga - Yoga With Adriene",
      src: "//www.youtube-nocookie.com/embed/BiWDsfZ3zbo",
      duration: 723,
      rrule: "",
    },
    {
      type: "video",
      name: "Wake Up Yoga - 11 Minute Morning Yoga Practice - Yoga With Adriene",
      src: "//www.youtube-nocookie.com/embed/UEEsdXn8oG8",
      duration: 693,
      rrule: "",
    },
    {
      type: "video",
      name: "Yoga For Neck, Shoulders, Upper Back - 10 Minute Yoga Quickie - Yoga With Adriene",
      src: "//www.youtube-nocookie.com/embed/X3-gKPNyrTA",
      duration: 637,
      rrule: "",
    },
    {
      type: "video",
      name: "Yoga For Text Neck | Yoga With Adriene",
      src: "//www.youtube-nocookie.com/embed/JUP_YdYyfQw",
      duration: 1725,
      rrule: "",
    },
    {
      type: "video",
      name: "Yoga for Neck and Shoulder Relief - Yoga With Adriene",
      src: "//www.youtube-nocookie.com/embed/SedzswEwpPw",
      duration: 1057,
      rrule: "",
    },
  ];
  return (
    <>
      <PageTitle>Good Morning!</PageTitle>
      <div className="md:container mx-auto dark:bg-black mt-4">
        <h1 className="font-extrabold text-6xl text-primary-600">Morning Routine</h1>
        <ul className="mt-8 space-y-4">
          {resources
            .filter(({ rrule: rruleString }) => {
              if (rruleString) {
                const rrule = rrulestr(rruleString);
                rrule.options.count = 1;
                return dayjs().isSame(rrule.all()[0], "day");
              } else {
                return false;
              }
            })
            .map((item) => (
              <ListItem {...item} />
            ))}
        </ul>
      </div>
    </>
  );
}
