import AdminNav from "../../components/AdminNav";
import Container from "../../components/Container";
import CreateCard from "../../components/CreateCard";
import ExistedCard from "../../components/ExistedCard";
import Header from "../../components/Header";
import { picturesApi } from "../../store/services/pictureService";

const AdminPictures = () => {
  const { data, isLoading } = picturesApi.useGetAllPicturesQuery("");

  // spawn a lot skeletons
  const elements = [];
  for (let i = 1; i <= 10; i++) {
    elements.push(
      <ExistedCard model="picture" isLoading={isLoading} data={0} key={i} />
    );
  }
  // **

  function reverseEz(arr: any) {
    let newData = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      newData.push(arr[i]);
    }
    return newData;
  }

  return (
    <>
      <div className="">
        <div className="mt-20">
          <Container>
            <h1 className="mb-7 text-title text-2xl fond-medium">
              Система управления - <span className="text-border">Картины</span>
            </h1>
            <div className="flex">
              <div className="flex w-1/5 mr-3">
                <AdminNav />
              </div>
              <div className="w-[80%] flex flex-wrap justify-start">
                <CreateCard model="picture" />
                {isLoading
                  ? elements
                  : reverseEz(data)?.map((picture) => (
                      <ExistedCard
                        model="picture"
                        isLoading={isLoading}
                        data={picture}
                        key={picture._id}
                      />
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
