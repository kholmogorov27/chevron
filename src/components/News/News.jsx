import {useContext, useEffect, useRef, useState} from 'react'
import {SettingsContext} from '../../contexts/Settings'
import classes from './News.module.css'
import {parse} from "rss-to-json";
import {Splide, SplideSlide} from "@splidejs/react-splide";

function News() {
    /* settings */
    const settings = useContext(SettingsContext)

    const isFeedEnabled = settings.menu.news.enableFeed
    const feedAddress = 'http://localhost:8010/proxy/alerts/feeds/02661268551886804278/13650704672702169625' || settings.menu.news.feedAddress

    const [news, setNews] = useState({items: []})
    const sliderRef = useRef(null)

    useEffect(() => {
        getFeed(feedAddress, setNews)
    }, [feedAddress])

    console.log(news.items)

    const splideOptions = {
        ref: sliderRef,
        tag: 'section',
        options: {
            pagination: false,
            width: '100%',
            arrows: false, //arrows && isSliderHasMultipleSlides,
            drag: true, //drag && isSliderHasMultipleSlides,
            perPage: 3,
            wheel: true,
            keyboard: true, //allowedModes.get('Slider').has(mode) ? 'global' : false,
            gap: 10
        }
    }

    return (<div className={classes['container'] + ' feed-slider'}>
        <Splide {...splideOptions}>
            {
                news.items.map((item, index) =>
                    <SplideSlide key={index}>
                        <div
                            className={classes['item']}
                            key={item.id}>
                            <span className={classes['title']}>
                                <span
                                    dangerouslySetInnerHTML={{__html: item.title}}
                                ></span>
                            </span>
                            <br/>
                            <br/>
                            <span className={classes['description']}
                                  dangerouslySetInnerHTML={{__html: item.content}}
                            ></span>
                        </div>
                    </SplideSlide>
                )
            }
        </Splide>
    </div>)
}

async function getFeed(feedAddress, setState) {
    const result = await parse(feedAddress);
    setState(result)
}

export default News