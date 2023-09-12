import AdminNav from "../../components/AdminNav";
import Container from "../../components/Container";
import CreateCard from "../../components/CreateCard";
import ExistedCard from "../../components/ExistedCard";
import Header from "../../components/Header";
import { countriesApi } from "../../store/services/countriesService";

const AdminCountries = () => {
  const { data, isLoading } = countriesApi.useGetAllCountriesQuery("");

  // spawn a lot skeletons
  const elements = [];
  for (let i = 1; i <= 10; i++) {
    elements.push(
      <ExistedCard model="country" isLoading={isLoading} data={0} key={i} />
    );
  }
  // **

  return (
    <>
      <div className="">
        <div className="mt-20">
          <Container>
            <h1 className="mb-7 text-title text-2xl fond-medium">
              Система управления - <span className="text-border">Страны</span>
            </h1>
            <div className="flex">
              <div className="flex min-w-[200px] mr-3">
                <AdminNav />
              </div>
              <div className="min-w-[850px] w-[80%] flex flex-wrap justify-start">
                <CreateCard model="country" />
                {isLoading
                  ? elements
                  : data?.map((country) => (
                      <ExistedCard
                        model="country"
                        isLoading={isLoading}
                        data={country}
                        key={country._id}
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

export default AdminCountries;
