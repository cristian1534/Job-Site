import { useRouter } from "next/router";
import ProfileDetails from "../../components/ProfileDetails";
// Importa los datos del perfil o accede a ellos desde una fuente de datos

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Aquí puedes obtener los detalles del perfil en función del ID y pasarlos a ProfileDetails

  const profile = {
    // Los detalles del perfil seleccionado
    // Puedes obtener estos datos de una fuente de datos, como una API o una base de datos
    name: "John Doe",
    email: "johndoe@example.com",
    telephone: "1234567890",
    address: "123 Main St",
    profileImage: "https://example.com/profile-image.jpg",
  };

  return <ProfileDetails profile={profile} />;
};

export default ProfilePage;
