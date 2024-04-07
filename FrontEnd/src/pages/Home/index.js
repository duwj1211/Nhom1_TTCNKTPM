import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.variation}>
      <div className={styles.variationInner}>
        <div className={styles.groupParent}>
          <div className={styles.groupContainer}>
            <div className={styles.rectangleParent}>
              <b className={styles.categories}>Categories</b>
              <b className={styles.exploreOurTop}>Explore our Top Categories</b>
            </div>
            <div className={styles.loremIpsumDolor}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
              feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus
              ut magna velit eleifend. Amet, quis urna, a eu.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero
              ipsum ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
              feugiat amet, libero ipsum..
            </div>
            <img
              className={styles.groupItem}
              alt=""
              src="/rectangle-11@2x.png"
            />
            <div className={styles.groupInner} />
            <div className={styles.higherEducation}>Higher Education</div>
            <div className={styles.rectangleDiv} />
            <div className={styles.loremIpsumDolor1}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
              feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus
              ut mat,
            </div>
            <img
              className={styles.rectangleIcon}
              alt=""
              src="/rectangle-111@2x.png"
            />
            <div className={styles.managementBooks}>Management Books</div>
            <div className={styles.loremIpsumDolor2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
              feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus
              ut mat,
            </div>
            <img
              className={styles.groupChild}
              alt=""
              src="/rectangle-112@2x.png"
            />
            <div className={styles.engineeringBooks}>Engineering Books</div>
            <div className={styles.loremIpsumDolor3}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
              feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus
              ut mat,
            </div>
            <img
              className={styles.sliderArrowBtn}
              alt=""
              src="/slider-arrow-btn.svg"
            />
          </div>
          <div className={styles.btn}>
            <div className={styles.btnChild} />
            <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            <div className={styles.viewMore}>View more</div>
          </div>
        </div>
      </div>
      <div className={styles.variationChild}>
        <div className={styles.viewAllProductsParent}>
          <b className={styles.viewAllProducts}>View all products</b>
          <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
          <div className={styles.simpleWayOf}>Simple way of piece life</div>
          <div className={styles.greatTravelAt}>Great travel at desert</div>
          <div className={styles.theLadyBeauty}>The lady beauty Scarlett</div>
          <div className={styles.onceUponA}>Once upon a time</div>
          <b className={styles.b}>$ 40.00</b>
          <b className={styles.b1}>$ 38.00</b>
          <b className={styles.b2}>$ 45.00</b>
          <b className={styles.b3}>$ 35.00</b>
          <div className={styles.armorRamsey}>Armor Ramsey</div>
          <div className={styles.sanchitHowdy}>Sanchit Howdy</div>
          <div className={styles.arthurDoyle}>Arthur Doyle</div>
          <div className={styles.klienMarry}>Klien Marry</div>
          <img className={styles.book161Icon} alt="" src="/book16-1@2x.png" />
          <img className={styles.book34Icon} alt="" src="/book3-4@2x.png" />
          <img className={styles.book44Icon} alt="" src="/book4-4@2x.png" />
          <img className={styles.book54Icon} alt="" src="/book5-4@2x.png" />
          <div className={styles.book55} />
          <div className={styles.addToCart}>add to cart</div>
          <div className={styles.newReleaseBooks}>New Release Books</div>
          <div className={styles.someQualityItems}>Some quality items</div>
          <img
            className={styles.sliderDotsIcon}
            alt=""
            src="/slider-dots.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
