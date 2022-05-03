import React from "react";
import "pages/Home/style.scss";
import Iframe from "react-iframe";

function Home() {
  return (
    <>
      {/* <Header isHome></Header> */}
      <div className="container home">
        <div className="row">
          {/* React Tabs */}
          <div className="col-md-12">
            <div className="">
              
            </div>
            <div className="comingsoon"> coming soon... </div>
            {/*   Twitter Follow Button     */}
            <div className="comingsoon followtwitter">
                  {/* <Suspense fallback={<div>Loading...</div>}>
                  <ReactTwitterFollowButton twitterAccount="teamphlote" showLarge={this.state.showLarge} showName={this.state.showName} showCount={this.state.showCount} />
                  </Suspense>
                  */}

              <Iframe
                id="twitter-widget-0"
                scrolling="no"
                allowtransparency="true"
                allowfullscreen="true"
                class="twitter-follow-button twitter-follow-button-rendered"
                Style="position: static; visibility: visible; width: 79px; height: 28px;"
                title="Twitter Follow Button"
                src="https://platform.twitter.com/widgets/follow_button.0edc1ef9f8b82d9b79c6115bda79f63f.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;screen_name=teamphlote&amp;show_count=false&amp;show_screen_name=false&amp;size=l&amp;time=1616502216642"
                data-screen-name="teamphlote"
                frameborder="0"
              ></Iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
