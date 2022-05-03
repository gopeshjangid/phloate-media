import React from "react";
import FadeIn from "react-fade-in";
import "./style.scss";
class Manifesto extends React.Component {
  //export default function Manifesto() {

  //const parentPath = props.match.path;
  componentDidMount() {
    document.title = "ABOUT PHLOTE | PHLOTE.CO";
  }
  render() {
    return (
      <>
        <FadeIn>
          <div className="page-container container">
            <div className="menifesto_title">MANIFESTO</div>
            <div className="page-content">
              <p>
                We believe all artists are culturally significant pioneers whose
                value should not diminish with time.
              </p>
              <p>
                We believe blockchain technology will usher in a new age of
                transparency and fairness that most artists have yet to
                experience, but deserve.
              </p>
              <p>
                Technology is putting power, control, and ownership back in the
                hands of the creatives whose work drives the culture.{" "}
              </p>
              <p>
                This new world will benefit niche artists, giving them the
                opportunity to identify and unite with their own unique fan
                communities.{" "}
              </p>
              <p>
                We're seeing new sources of capital forming to support artists,
                giving rise to business models for creatives.{" "}
              </p>
              <p>
                We reject the notion that the "starving artist" is a right of
                passage, and believe that properly designed investment
                partnership can work to maximize the global reach and influence
                of an artist's work.{" "}
              </p>

              <p>
                Expert community-driven curation is an important emerging art
                form that will dominate scale going forward. We believe the
                curation of experiences is greater than the curation of
                collectibles.{" "}
              </p>
            </div>
            <div className="bottom_line"></div>
          </div>
        </FadeIn>
      </>
    );
  }
}

export default Manifesto;
