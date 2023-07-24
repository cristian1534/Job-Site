import ProfileDetails from "@/components/ProfileDetails/ProfileDetails";
import { fetchProfileById } from "@/redux/reducers/profileById";
import store from "@/redux/store";

const ProfilePage = ({ profile }) => {
  return <ProfileDetails profile={profile} />;
};

export default ProfilePage;

export async function getServerSideProps({ params }) {
  const { id } = params;

  try {
    const profile = await store.dispatch(fetchProfileById(id));
    return {
      props: {
        profile: profile.payload,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
