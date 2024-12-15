type ProfilePageParams = {
  params: Promise<{ username: string }>
}

export default async function ProfilePage({ params }: ProfilePageParams) {
  const { username } = await params
  return (
    <>
      <h1 className='text-xl'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, qui!
        Corrupti vel alias, temporibus in autem deleniti laborum sed optio
        perferendis iste at quae! Doloribus illum libero ipsa praesentium
        itaque?
      </h1>
      <h3 className='text-3xl font-bold'>{username}</h3>
    </>
  )
}
