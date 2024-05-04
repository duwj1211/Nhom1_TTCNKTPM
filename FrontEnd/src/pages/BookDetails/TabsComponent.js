import classNames from 'classnames/bind';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './TabsComponent.module.css';

const cx = classNames.bind(styles);

function TabsComponent({tabs = []}) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [allTabs, setAllTabs] = useState(tabs);

    const { id } = useParams();
  
    const activateTab = (index) => {
        setActiveTabIndex(index);
    };

    return ( 
        <div className={cx('TabView')}>
            <div className={cx('body')}>
                {allTabs.length === 0 ? (
                    <div className={cx('tabs')}>
                        <div>No Tabs</div>
                    </div>
                ) : (
                    <div>
                        <div className={cx('tabs')}>
                            {allTabs.map((tab, index) => (
                                <label
                                    key={index}
                                    className={cx('tab',index === activeTabIndex ? cx('active') : 'hidden')}
                                    id={(tab.name === "Description") ? ('description-tabs') : ('reviews-tabs')}
                                    onClick={() => activateTab(index)}
                                >
                                    {tab.name}
                                </label>
                            ))}
                        </div>
                        <div className={cx('content')}>{allTabs[activeTabIndex].content}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TabsComponent;