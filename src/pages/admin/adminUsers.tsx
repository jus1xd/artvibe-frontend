import AdminNav from "../../components/AdminNav";
import Container from "../../components/Container";
import CreateCard from "../../components/CreateCard";
import ExistedCard from "../../components/ExistedCard";
import Header from "../../components/Header";
import { authApi } from "../../store/services/authService";

const AdminUsers = () => {
  const { data, isLoading } = authApi.useGetAllUsersQuery("");

  // spawn a lot skeletons
  const elements = [];
  for (let i = 1; i <= 10; i++) {
    elements.push(
      <ExistedCard model="user" isLoading={isLoading} data={0} key={i} />
    );
  }
  // **

  function reverseEz(arr: any) {
    if (arr) {
      let newData = [];
      for (let i = arr.length - 1; i >= 0; i--) {
        newData.push(arr[i]);
      }
      return newData;
    }
  }

  return (
    <>
      <div className="">
        <div className="mt-20">
          <Container>
            <h1 className="mb-7 text-title text-2xl fond-medium">
              Система управления -{" "}
              <span className="text-border">Пользователи</span>
            </h1>
            <div className="flex">
              <div className="flex w-1/5 min-w-[170px] mr-3">
                <AdminNav />
              </div>
              <div className="w-[80%] min-w-[600px] flex flex-wrap justify-start">
                <CreateCard model="user" />
                {isLoading
                  ? elements
                  : reverseEz(data)?.map((user) => (
                      <ExistedCard
                        model="user"
                        isLoading={isLoading}
                        data={user}
                        key={user._id}
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

export default AdminUsers;
