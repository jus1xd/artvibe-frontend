import AdminNav from "../../components/AdminNav";
import Container from "../../components/Container";
import CreateCard from "../../components/CreateCard";
import ExistedCard from "../../components/ExistedCard";
import Header from "../../components/Header";
import { authApi } from "../../store/services/authService";

const AdminModels = () => {
  return (
    <>
      <div className="">
        <Header />
        <div className="mt-20">
          <Container>
            <h1 className="mb-7 text-title text-2xl fond-medium">
              Система управления -{" "}
              <span className="text-border">3D модели</span>
            </h1>
            <div className="flex">
              <div className="flex w-1/5 min-w-[170px] mr-3">
                <AdminNav />
              </div>
              <div className="w-[80%] min-w-[600px] flex flex-wrap justify-start">
                <CreateCard model="3d" />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default AdminModels;
