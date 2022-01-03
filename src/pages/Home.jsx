import React from "react";
const Home = () => {
  const [fullUrl, SetFullUrl] = React.useState();
  const [shortUrl, SetShortUrl] = React.useState();
  const [allshorturl, SerAllShortUrl] = React.useState();
  const shortUrlRequest = () => {
    fetch("http://localhost:8080/shorturl/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        FULL_URL: fullUrl,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        SetShortUrl(json);
      });

    allshortUrl();
  };

  const urlInput = (e) => {
    SetFullUrl(e.target.value);
  };

  const allshortUrl = async () => {
    const url = "http://localhost:8080/shorturl/74:d4:35:91:8b:b7";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        SerAllShortUrl(json);
        console.log(json);
      });
  };

  React.useEffect(() => {
    allshortUrl();
  }, []);

  return (
    <>
      <div className="">
        <div className="flex justify-center my-10 items-stretch">
          <div className="bg-white w-96 justify-center items-stretch mx-2 px-2 ">
            <input
              onChange={urlInput}
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-3 mt-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="http://"
            ></input>

            <div
              onClick={shortUrlRequest}
              className="hover:bg-gray-200 hover:text-black cursor-pointer text-center py-2 bg-violet-700 text-white rounded"
            >
              <p className="">Short.ly</p>
            </div>

            <div className=" py-4 text-center h-max">
              {!shortUrl ? (
                <p>Paste the URL to be Short.ly</p>
              ) : (
                <a
                  className="text-blue-700"
                  href={"http://127.0.0.1:8080/" + shortUrl}
                >
                  {"http://127.0.0.1:8080/" + shortUrl}
                </a>
              )}
            </div>

            <div />
          </div>
        </div>
        <div className="flex justify-center mx-20">
          <table>
            <tr className="mx-5 py-2 bg-gray-200">
              <th className="w-[200px] text-left">Main URL</th>
              <th className="w-[200px] text-left">Short URL</th>
              <th className="w-[100px] text-left">Clicks</th>
            </tr>

            {!allshorturl
              ? ""
              : allshorturl.map((val) => {
                  return (
                    <>
                      <tr className="mx-5 py-2 space-x-4">
                        <td className="text-left">{val.FULL_URL} </td>
                        <td>
                          {" "}
                          <a href={"http://127.0.0.1:8080/" + val.SHORT_URL}>
                            {val.SHORT_URL}{" "}
                          </a>
                        </td>
                        <td>{val.VIEW} </td>
                      </tr>
                    </>
                  );
                })}
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
