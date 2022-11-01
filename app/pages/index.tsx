import Button from "./components/common/Button/Button";
import Card from "./components/common/Card/Card";
import Input from "./components/common/Input/Input";
import ReactPaginate from "react-paginate";

const Home = () => {
  const handlePageClick = () => {};
  const pageCount = 4;

  return (
    <main>
      <p>Hello world</p>

      <div className="grid space-y-4 mb-4">
        <Button>
          <span>Connect wallet</span>
        </Button>

        <Input />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName="flex justify-center items-center space-x-2 mt-4"
        activeClassName="bg-gray-900 text-white p-2 rounded"
        pageClassName="bg-gray-200 p-2 aspect-square w-10 text-center rounded"
        previousClassName="bg-gray-200 p-2 text-center rounded"
        nextClassName="bg-gray-200 p-2 text-center rounded"
      />
    </main>
  );
};

Home.title = "Home Page";

export default Home;
