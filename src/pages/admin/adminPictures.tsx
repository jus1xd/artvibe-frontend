import AdminNav from "../../components/AdminNav";
import Container from "../../components/Container";
import CreateCard from "../../components/CreateCard";
import ExistedCard from "../../components/ExistedCard";
import Header from "../../components/Header";
import { picturesApi } from "../../store/services/pictureService";

const AdminPictures = () => {
  const { data } = picturesApi.useGetAllPicturesQuery("");

  return (
    <>
      <div className="">
        <Header />
        <div className="mt-20">
          <Container>
            <h1 className="mb-7 text-title text-2xl fond-medium">
              Система управления -{" "}
              <span className="text-border">Картины</span>
            </h1>
            <div className="flex">
              <div className="flex w-1/5 mr-3">
                <AdminNav />
              </div>
              <div className="w-[80%] flex flex-wrap justify-start">
                <CreateCard model="picture" />
                {data?.map((picture) => (
                  <ExistedCard model="picture" data={picture} key={picture._id} />
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default AdminPictures;
