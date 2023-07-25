import ProfileDetails from "@/components/ProfileDetails/ProfileDetails";
import { fetchProfileById } from "@/redux/reducers/profileById";
import store from "@/redux/store";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

const ProfilePage = ({ profile }) => {
  const { loading } = useSelector((state) => state.profile);
  return (
    <div>
      {loading && <Loader />}
      <ProfileDetails profile={profile} />
    </div>
  );
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
