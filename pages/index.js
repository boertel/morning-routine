const ListItem = ({ name, src }) => {
  return (
    <div className="rounded border-2 border-primary px-4 py-3 hover:bg-primary hover:bg-opacity-30 cursor-pointer">
      <h4 className="">{name}</h4>
      <div className="flex justify-center">
      <iframe width="560" height="315" src={src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
      </div>
  )
}

export default function Home() {
  const resources = [
    {type: 'video', name: '8 mins abs workout', src: '//www.youtube.com/watch?v=W-9L0J_9qag'},
    {type: 'video', name: 'Fresh Start', src: '//www.youtube.com/watch?v=Vry_VI76_Es'},
  ]
  return (
    <div className="md:container mx-auto dark:bg-black mt-4">
      <h1 className="font-extrabold text-6xl">Morning Routine</h1>
      <ul className="mt-8 space-y-4">
        {resources.map((item) => <ListItem {...item} />)}
      </ul>
    </div>
  )
}
