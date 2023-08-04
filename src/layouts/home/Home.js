import { memo, useContext, useEffect, useState, useCallback } from 'react'
import Category from '../../components/category/Category'

import { AiOutlineTags, AiOutlineClockCircle, AiOutlineLike } from "react-icons/ai"
import { Link } from "react-router-dom"

import { AppContext } from '../../App'

import { formatRelative, subDays } from 'date-fns'
import { vi } from 'date-fns/locale'

import { Form, InputGroup } from "react-bootstrap";


function Home() {
    const { display, page, setPage, totalPage } = useContext(AppContext);
    const [categories, setCategories] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null); // state để lưu trữ category đang được chọn
  
    useEffect(() => {
      const api = "http://localhost:3005/categories";
      console.log(`call api ${api}`);
      fetch(api, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => setCategories(json))
        .catch((err) => console.log(err));
    }, []);

    function FindCategory({ category }) {
        if (categories.length > 0) {
            const find = categories.find(item => item.id === category)
            return (
                <a href='/' onClick={(e) => { e.preventDefault(); }}># {find.category}</a>
            )
        } else {
            return 'Loading...'
        }
    }
  
    const handleSearch = useCallback(
      (event) => {
        setSearchKeyword(event.target.value);
      },
      [setSearchKeyword]
    );
  
    const handleCategoryClick = useCallback(
      (categoryId) => {
        setSelectedCategory(categoryId);
      },
      [setSelectedCategory]
    );
  
    const Card = () => {
      const searchResults = display.filter(
        (item) =>
          item.title.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1 &&
          // Kiểm tra nếu state selectedCategory đang có giá trị thì chỉ lấy các items có category tương ứng
          (!selectedCategory || item.category === selectedCategory)
      );
  
      return (
        <section className="blog mt-4">
          <div className="offset-md-3 col-md-6">
            <InputGroup>
              <InputGroup.Text id="btnGroupAddon">Search</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search something ..."
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
                value={searchKeyword}
                onChange={handleSearch}
                autoFocus
              />
            </InputGroup>
          </div>

          <div className="container-fluid">

            <div className="row">
              <div className="col-12 col-sm-6 col-md-2 col-lg-2 my-2">
                <div className="tag box boxItems" >
                   <AiOutlineTags className="icon" />
                  <a href='#category' onClick={(e) => setSelectedCategory(null)}> All</a>
                </div>
              </div>
              {categories.map((category, index) => (
                <div className="col-12 col-sm-6 col-md-2 col-lg-2 my-2" key={index}>
                  <div className={`box boxItems ${selectedCategory === category.id ? 'active' : ''}`}>
                    <div className="tag" >
                      <AiOutlineTags className="icon" />
                      <a href="#category" onClick={() => handleCategoryClick(category.id)}> # {category.category}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row">

              {searchResults.map((item, index) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-3" key={index}>
                  <div className="box boxItems ">
                    <div className="img d-flex justify-content-center">
                      <img src={item.cover} style={{ width: "100%", height: "13rem" }} alt="cover" />
                    </div>
                    <div className="details">
                      <div className="tag my-2">
                        <AiOutlineTags className="icon" />
                        <FindCategory category={item.category} />
                      </div>
                      <Link to={`/detail/${item.id}`} className="link">
                        <h4 className="hidden-2">{item.title}</h4>
                      </Link>
                      <p className="hidden-3">{item.desc}</p>
                      <div className="date d-flex justify-content-between">
                        <div className="d-flex align-sefl-center">
                          <AiOutlineClockCircle className="icon " />
                          <label className=" mx-2">{formatRelative(subDays(new Date(item.date), 0), new Date(), { locale: vi })}</label>
                        </div>
                        <div className="d-flex align-sefl-center">
                          <AiOutlineLike className="icon" />
                          <label className=" mx-2">{item.like.length}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {Number(page) !== Number(totalPage) ? (
              <div className="row justify-content-center mb-5">
                <button className="button" onClick={() => setPage(page + 1)}>
                  Xem Thêm
                </button>
              </div>
            ) : null}
          </div>
        </section>
      );
    };

    return (
        <>
            <Category categories={categories} />
            <Card />
        </>
    )
}



export default memo(Home)