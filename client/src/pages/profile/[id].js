import { useRouter } from "next/router";
import ProfileDetails from "@/components/ProfileDetails/ProfileDetails";


const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const profile = {
    name: "Pedro Gomez",
    email: "pedro@gmail.com",
    telephone: "1234567890",
    address: "123 Montevideo Street",
    profileImage: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
  };

  return <ProfileDetails profile={profile} />;
};

export default ProfilePage;
