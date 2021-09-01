#! /usr/bin/env node
'use strict';
const request = require('request');

// 開発環境用 data
const data = [
  {
    "publishingOffice":"横浜地方気象台",
    "reportDatetime":"2021-09-01T05:00:00+09:00",
    "timeSeries":[
      {
        "timeDefines":[
          "2021-09-01T05:00:00+09:00",
          "2021-09-02T00:00:00+09:00"
        ],
        "areas":[
          {
            "area":
              {
                "name":"東部",
                "code":"140010"
              },
            "weatherCodes":
              [
                "203",
                "302"
              ],
            "weathers":
              [
                "くもり　時々　雨",
                "雨　時々　くもり"
              ],
            "winds":
              [
                "北東の風　後　北の風",
                "北の風"
              ],
            "waves":
              ["１メートル",
               "１メートル"
              ]
          },
          {
            "area":
            {
              "name":"西部",
              "code":"140020"
            },
            "weatherCodes":
              [
                "203",
                "302"],
            "weathers":
            [
              "くもり　時々　雨",
              "雨　時々　くもり"
            ],
            "winds":
            [
              "北の風",
              "北の風"
            ],
            "waves":
            [
              "１メートル",
              "１メートル"
            ]
          }
        ]
      },
      {
        "timeDefines":
        [
          "2021-09-01T06:00:00+09:00",
          "2021-09-01T12:00:00+09:00",
          "2021-09-01T18:00:00+09:00",
          "2021-09-02T00:00:00+09:00",
          "2021-09-02T06:00:00+09:00",
          "2021-09-02T12:00:00+09:00",
          "2021-09-02T18:00:00+09:00"
        ],
        "areas":
        [
          {
            "area":
            {
              "name":"東部",
              "code":"140010"
            },
            "pops":
            [
              "50","50","50","50","60","60","60"
            ]
          },
          {
            "area":
            {
              "name":"西部",
              "code":"140020"
            },
            "pops":
            [
              "50","50","50","50","60","70","60"
            ]
          }
        ]
      },
      {
        "timeDefines":
        [
          "2021-09-01T09:00:00+09:00",
          "2021-09-01T00:00:00+09:00",
          "2021-09-02T00:00:00+09:00",
          "2021-09-02T09:00:00+09:00"],
          "areas":
          [
            {
              "area":
              {
                "name":"横浜",
                "code":"46106"
              },
              "temps":
              [
                "26","26","21","24"
              ]
            },
            {
              "area":
              {
                "name":"小田原",
                "code":"46166"
              },
              "temps":
              [
                "27","27","21","26"
              ]
            }
          ]
        }
      ]
    },
    {
      "publishingOffice":"横浜地方気象台",
      "reportDatetime":"2021-08-31T17:00:00+09:00",
      "timeSeries":
      [
        {
          "timeDefines":
          [
            "2021-09-01T00:00:00+09:00",
            "2021-09-02T00:00:00+09:00",
            "2021-09-03T00:00:00+09:00",
            "2021-09-04T00:00:00+09:00",
            "2021-09-05T00:00:00+09:00",
            "2021-09-06T00:00:00+09:00",
            "2021-09-07T00:00:00+09:00"
          ],
          "areas":
          [
            {
              "area":
              {
                "name":"神奈川県",
                "code":"140000"
              },
              "weatherCodes":
              [
                "203","203","202","202","200","200","200"
              ],
              "pops":
              [
                "","60","60","50","40","40","40"
              ],
              "reliabilities":
              [
                "","","B","C","C","B","B"
              ]
            }
          ]
        },
        {
          "timeDefines":
          [
            "2021-09-01T00:00:00+09:00",
            "2021-09-02T00:00:00+09:00",
            "2021-09-03T00:00:00+09:00",
            "2021-09-04T00:00:00+09:00",
            "2021-09-05T00:00:00+09:00",
            "2021-09-06T00:00:00+09:00",
            "2021-09-07T00:00:00+09:00"
          ],
          "areas":
          [
            {
              "area":
              {
                "name":
                "横浜",
                "code":"46106"
              },
              "tempsMin":
              [
                "","21","22","22","22","21","22"
              ],
              "tempsMinUpper":
              [
                "","22","24","23","24","24","24"
              ],
              "tempsMinLower":
              [
                "","19","20","20","20","20","21"
              ],
              "tempsMax":
              [
                "","25","27","27","27","27","29"
              ],
              "tempsMaxUpper":
              [
                "","30","31","30","30","29","32"
              ],
              "tempsMaxLower":
              [
                "","22","24","24","24","23","27"
              ]
            }
          ]
        }
      ],
      "tempAverage":
      {
        "areas":
        [
          {
            "area":
            {
              "name":"横浜",
              "code":"46106"
            },
            "min":"23.0",
            "max":"29.5"
          }
        ]
      },
      "precipAverage":
      {
        "areas":
        [
          {
            "area":
            {
              "name":"横浜",
              "code":"46106"
            },
            "min":"18.0",
            "max":"54.3"
          }
        ]
      }
    }
  ]

// end point(神奈川県は14000)
const url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/140000.json';


const API_request = () => {
  request({url: url, json: true}, (err, res, data) => {
    // error check
    if( err !== null ){
      console.error(`error: ${err}`);
      return false;
    }
    console.info(`Successed statuscode at ${res.statusCode}`);
    postTweet(data);
  })
}
// ツイート用
const Twitter = require('twitter-lite');

const twitter = new Twitter({
  consumer_key: ${consumer_key},
  consumer_secret: ${consumer_secret},
  access_token_key: ${access_token_key},
  access_token_secret: ${access_token_secret}
});

// ツイートする関数
function postTweet(data) {
  twitter.post('statuses/update', {
    status: textArrange(data)
  }).then((tweet) => {
    console.log(tweet);
  }).catch((err) => {
    console.error(err);
    console.log(twitter)
  });
}

// ツイートの体裁を整える関数
const textArrange = (data) => {
  const date = new Date(data[0].reportDatetime);
  const text = `${date.getMonth() + 1}月${date.getDate()}日 ${data[0].timeSeries[2].areas[0].area.name}の天気です\n天気は ${data[0].timeSeries[0].areas[0].weathers[0]}\n最低気温は ${data[1].tempAverage.areas[0].min}℃ 最高気温は${data[1].tempAverage.areas[0].max}℃です`
  return text
}

API_request();