import { useRouter } from "next/router";
import ProfileDetails from "../profile";

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  

  const profile = {
    name: "John Doe",
    email: "johndoe@example.com",
    telephone: "1234567890",
    address: "123 Main St",
    profileImage: "https://example.com/profile-image.jpg",
  };

  return <ProfileDetails profile={profile} />;
};

export default ProfilePage;
