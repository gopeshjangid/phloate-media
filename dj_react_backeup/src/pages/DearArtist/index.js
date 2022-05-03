import React, { useEffect } from "react";
import FadeIn from "react-fade-in";
import "./style.scss";

export default function DearArtist() {
  useEffect(() => {
    // Update the document title using the browser API
    document.title = "DEAR ARTIST | PHLOTE.CO";
  });
  return (
    <>
      <FadeIn>
        <div className="page-container container">
          <div className="vr_line"></div>
          <div className="page-content dearart">
            <p>Dear Recording Artist,</p>
            <p className="faq_title">
              {" "}
              We see you. We hear you. And we want to help.
            </p>

            <p>
              Almost universally, every artist we've spoken with has said the
              same thing. They want to be financially independent and creatively
              free. The career defining moment you're waiting for has less to do
              with sold out arenas or number one records. The "moment" every
              artist is waiting to experience is the realization that their
              career is sustainable and growing, supported by a loyal fanbase.
            </p>

            <p className="faq_title"> So how do you achieve that?</p>

            <p>
              The bad news is, the music industry, as currentty designed,
              doesn't pay. Artists earn between $.0032 and $.0056 per stream
              depending on the digital streaming platform, meaning that for
              every 10,000 streams, you're making up to $56. As reported by the
              performing rights organizations, the average song generates $114
              annually, a statistic that is upwardly skewed by the top 1% of
              popular songs. Many artists simply can't last long enough to win
              against this math.
            </p>

            <p>
              Although the industry generates $43 billion in annual revenue, the
              reality is that nearly 90% of the profits are directed to
              corporate intermediaries, leaving very little for the artist who's
              creative work drives fan engagement, the real lifeblood of the
              entire music ecosystem.
            </p>

            <p>
              While the growth of streaming would appear to be a much needed
              lifeline, the reality is that streaming platforms have only served
              to drive profitability for major labels.
            </p>

            <p>
              The situation for artists is only made worse by the abundance of
              new music being released every day. On average, 40,000 songs are
              uploaded to Spotify daily. SoundCloud celebrated their 2 millionth
              song in 2017. No reasonable marketing budget will help an artist
              pierce through that amount of noise, no matter how good the music
              is. Competing for attention is an expensive game that's almost
              impossible to win.
            </p>

            <p className="faq_title"> So what's the solution?</p>

            <p>
              In order to build a sustainable career, artists have to do it the
              "old fashioned" way: by setting quality products to paying
              customers. Artists need to do get paid.{" "}
            </p>

            <p>
              As any business owner knows, free product can't be given away
              forever. At some point, customers need to buy something. Same goes
              for recording artists. I've yet to wrap my head around why a
              talented band, for example, would practice for years making music
              that only serves to push their merch line! It doesn't make sense.
              Fans need to buy music again and invest in the artists they love.
              There's no better way to allow artists to continue to exist and
              improve.{" "}
            </p>

            <p>
              Selling also benefits the artists by giving them visibility of
              their most loyal fans. Being able to identify who in the audience
              is willing to pay is a great way to identify and reward the "true
              fans" and continue to serve them.{" "}
            </p>

            <p>
              The good news is, it doesn't take an audience of millions to have
              a sustainable career. Most emerging artists could easily amass
              5000 followers across social media. Delivering that audience
              enough value for them to spend $20 a year would allow many artists
              to exist as creators full time. Some believe it only takes 100 or
              1000 true fans to make this plan work.{" "}
            </p>

            <p>
              Technology is also helping the cause. We're now seeing many new
              sources of capital forming to support artists. One promising
              development that we believe is the future of how artist's will
              finance their careers is the growth of cryptographic tokens that
              come as fully fungible social tokens, semi-fungible tokens, and
              digital collectibles called Non-fungible Tokens (NFT's).{" "}
            </p>

            <p className="faq_title"> What's an NFT?</p>

            <p>
              NFT's are unique digital collectibles that replicate physical
              collectibles with a few added benefits. Like physical
              collectibles, value is driven from their scarcity. Because they're
              digital, NFT's are easier to store, maintain, insure, and trade.
              Platforms are now developing new ways to display and secure these
              collections as well.{" "}
            </p>

            <p>
              In music, social token, SFT's, and NFT's can be used to unlock
              exclusive experiences for their owners. These experiences can be
              as simple as listening rights to unreleased content or may include
              a share of royalties generated from a song. Importantly, these
              ownership rights have the opportunity to increase in value over
              time as the popularity of the artist or content becomes more
              popular and can be traded from one owner to another.{" "}
            </p>

            <p>
              For music tastemakers who have their finger on the pulse of what's
              hip, social tokens and NFT's represent a way to capitalize on
              their ability to identify the next wave of artists before the
              general market. For this reason, social tokens and NFT's are
              becoming an increasingly popular way to capture future value,
              similar to other types of appreciating assets like stocks. When
              tied to the brand of emerging artists, cryptographic tokens become
              an interesting way to invest in music.
            </p>

            <p>
              For artists, tokenization delivers a desperately needed revenue
              source and an important way to connect directly with their biggest
              fans. The ability to know who is invested in their career growth
              is invaluable as it provides artist the ability to cultivate those
              relationships. This type of relationship building is not available
              to artists via social media or streaming platforms as currently
              constructed, but is extremely valuable nonetheless.
            </p>

            <p>
              As new business models emerge for artists, we believe there's
              limitless potential for artists to curate and price exclusive
              experiences for their fan communities. The promise of blockchain
              technology extends far beyond the purchase of bitcoin and
              Ethereum. The real potential is the technology's ability to
              efficiently distribute cultural value in new ways that have yet to
              be fully explored. This is a great advance for creators of all
              kinds.
            </p>

            <p className="text-center"> PHLOTE </p>
          </div>
        </div>
      </FadeIn>
    </>
  );
}
