import { useState, useEffect } from "react";
import HomeSection from "../../components/HomeSection/HomeSection";
import IslamicSubSection from "../../components/IsalmicSubSection/IslamicSubSection";
import { useSelector } from "react-redux";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import useHTTP from "../../hooks/use-http";

const Islamic = () => {
    const [categories, setCategories] = useState([]);
    const { sendRequest: getCategories } = useHTTP();
    const lang = useSelector((state) => {
        return state.lang.globalLang;
    });

    useEffect(() => {
        getCategories(
            { url: `categories`, method: 'GET' },
            data => {
                setCategories(data.data);
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LayoutWrapper>
            <div className="container-fluid">
                {categories.map((category) => (
                    <HomeSection key={category.id} header={lang === "ar" ? category.name : category.name_en} showAll="/">
                        <IslamicSubSection id={category.id}/>
                    </HomeSection>
                ))}
            </div>
        </LayoutWrapper>
    )
}

export default Islamic;