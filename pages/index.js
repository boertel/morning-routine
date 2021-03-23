import { Checkbox, VideoPlayer } from "ui";
import dayjs from "dayjs";
import { rrulestr } from "rrule";

const ListItem = ({ name, src }) => {
  return (
    <div className="rounded border-2 border-primary px-4 py-3 hover:bg-primary hover:bg-opacity-30 cursor-pointer">
      <h4 className="pb-4">{name}</h4>
      <div className="flex justify-center items-center flex-col">
        <VideoPlayer src={src} />
        <fieldset>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <Checkbox name="day" value={day} key={day}>
              {day}
            </Checkbox>
          ))}
        </fieldset>
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
      name: "Sunrise Yoga",
      src: "//www.youtube-nocookie.com/embed/r7xsYgTeM2Q",
      duration: 933,
      rrule: "RRULE:FREQ=WEEKLY;BYDAY=TU,TH",
    },
  ];
  return (
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
  );
}
