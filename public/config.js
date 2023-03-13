window.CONFIG = {
  macros: [
    {
      category: 'Entertainment',
      name: 'YouTube',
      triggers: [
        'y',
        'yt',
        'youtube',
      ],
      key: 'KeyY',
      icon: 'youtube',
      url: 'https://youtube.com',
      normalisedURL: 'youtube.com',
      commands: {
        go: {
          template: 'https://youtu.be/{$}',
          description: 'go to video'
        },
        search: {
          template: '{@}/results?search_query={$}'
        }
      },
      bgColor: {
        type: 'solid',
        color: '#f30002'
      },
      textColor: '#212121',
      pinned: true
    },
    {
      category: 'Communication',
      name: 'Telegram',
      icon: 'telegram',
      url: 'http://t.me',
      normalisedURL: 't.me',
      triggers: [
        'm',
        'tm',
        'tg',
        'teleg',
        'telega',
        'telegram'
      ],
      key: 'KeyM',
      commands: {
        go: {
          template: '{@}/{$}'
        }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'radial',
        colors: ['#29aaed', '#25a4e2'],
        stops: [40, 100]
      },
      textColor: '#fff',
      pinned: true
    },
    {
      category: 'Communication',
      name: 'WhatsApp',
      icon: 'whatsApp',
      url: 'https://web.whatsapp.com',
      normalisedURL: 'whatsapp.com',
      triggers: [
        'w',
        'wa',
        'wapp',
        'wahtsapp',
      ],
      key: 'KeyW',
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        angle: 45,
        colors: ['#26d347', '#58f879']
      },
      textColor: '#fff',
      pinned: true
    },
    {
      category: 'Social',
      name: 'Reddit',
      triggers: [
        'r',
        'rd',
        'reddit',
      ],
      key: 'KeyR',
      icon: 'reddit',
      url: 'https://reddit.com',
      normalisedURL: 'reddit.com',
      commands: {
        go: {
          template: '{@}/r/{$}',
          description: 'go to subreddit'
        },
        search: {
          template: '{@}/search?q={$}'
        }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        colors: ['#f07e23', '#f74300'],
        stops: [0, 100]
      },
      textColor: '#fff',
      pinned: true
    },
    {
      category: 'Programming',
      name: 'GitHub',
      icon: 'github',
      url: 'https://github.com',
      normalisedURL: 'github.com',
      triggers: [
        'g',
        'git',
        'github'
      ],
      key: 'KeyG',
      commands: {
        go: {
          template: '{@}/{$}',
          description: 'go to user'
        },
        search: {
          template: '{@}/search?q={$}'
        }
      },
      bgColor: {
        type: 'solid',
        color: '#171515'
      },
      textColor: '#e8e8e8',
      pinned: true
    },
    {
      category: 'Programming',
      name: 'StackOverflow',
      icon: 'stackoverflow',
      url: 'https://stackoverflow.com',
      normalisedURL: 'stackoverflow.com',
      triggers: [
        's',
        'st',
        'so',
        'stack',
        'stackoverflow'
      ],
      key: 'KeyS',
      commands: {
        search: {
          template: '{@}/search?q={$}'
        },
        go: {
          template: '{@}/questions/{$}',
          description: 'go to question'
        }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        colors: ['#e87922', '#ffbe25'],
        stops: [0, 100]
      },
      textColor: '#212121',
      pinned: true
    },
    {
      category: 'Programming',
      name: 'ChatGPT',
      icon: 'chatGPT',
      url: 'https://chat.openai.com/chat',
      normalisedURL: 'openai.com',
      triggers: [
        'c',
        'chat',
        'gpt',
        'cgpt',
        'chatgpt'
      ],
      key: 'KeyC',
      bgColor: {
        type: 'solid',
        color: '#70a597',
      },
      textColor: '#f7f7f7',
      pinned: true
    },
    {
      category: 'Other',
      name: 'Translate',
      icon: 'translate',
      url: 'https://translate.google.com',
      normalisedURL: 'translate.google.com',
      triggers: [
        't',
        'translate'
      ],
      key: 'KeyT',
      commands: {
        search: {
          template: '{@}/?text={$}',
          description: 'translate text'
        }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        angle: 45,
        colors: ['#508bed', '#4654b4']
      },
      textColor: '#fff',
      pinned: true
    },
    {
      category: 'Social',
      name: 'Instagram',
      triggers: [
        'i',
        'ig',
        'insta',
        'instagram'
      ],
      key: 'KeyI',
      icon: 'instagram',
      url: 'https://instagram.com',
      normalisedURL: 'instagram.com',
      commands: {
        go: {
          template: '{@}/{$}',
          description: 'go to user'
        }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'radial',
        angle: 'circle at 30% 107%',
        colors: ['#fdf497', '#fdf497', '#fd5949', '#d6249f', '#285aeb'],
        stops: [0, 5, 45, 60, 90]
      },
      textColor: '#e8e8e8',
      pinned: true
    },
    {
      category: 'Music',
      name: 'spotify',
      icon: 'spotify',
      url: 'https://open.spotify.com',
      normalisedURL: 'spotify.com',
      triggers: [
        'music',
        'sp',
        'sfy',
        'spo',
        'spotify'
      ],
      commands: {
        search: {
          template: '{@}/search/{$}'
        },
        go: {
          template: '{@}/track/{$}',
          description: 'go to track'
        }
      },
      bgColor: {
        type: 'solid',
        color: '#1ccc5b'
      },
      textColor: '#000',
      pinned: true
    },
    {
      category: 'Social',
      name: 'Discord',
      icon: 'discord',
      key: 'KeyD',
      triggers: [
        'd',
        'dis',
        'discord'
      ],
      url: 'https://discord.com/app',
      normalisedURL: 'discord.com',
      bgColor: {
        type: 'solid',
        color: '#5460e6'
      },
      textColor: '#fff',
      pinned: true
    },
    {
      category: 'Social',
      name: 'Twitch',
      icon: 'twitch',
      url: 'https://twitch.tv',
      normalisedURL: 'twitch.tv',
      triggers: [
        'tw',
        'twitch',
      ],
      commands: {
        search: {
          template: '{@}/search?term={$}'
        },
        go: {
          template: '{@}/{$}'
        }
      },
      bgColor: {
        type: 'solid',
        color: '#8c44f7'
      },
      textColor: '#000',
      pinned: true
    },
    {
      category: 'Entertainment',
      name: 'Netflix',
      triggers: [
        'n',
        'nf',
        'nfx',
        'netflix',
      ],
      key: 'KeyN',
      icon: 'netflix',
      url: 'https://media.netflix.com',
      normalisedURL: 'netflix.com',
      commands: {
        search: {
          template: '{@}/en/search?&term={$}'
        }
      },
      bgColor: {
        type: 'solid',
        color: '#000'
      },
      textColor: '#da0813',
      pinned: true
    },
    {
      category: 'Social',
      name: 'Twitter',
      icon: 'twitter',
      url: 'https://twitter.com',
      normalisedURL: 'twitter.com',
      triggers: [
        'tt',
        'twt',
        'twit',
        'twitt',
        'twitter'
      ],
      commands: {
        search: {
          template: '{@}/search?q={$}'
        },
        go: {
          template: '{@}/{$}'
        }
      },
      bgColor: {
        type: 'solid',
        color: '#1c99e6'
      },
      textColor: '#e8e8e8',
      pinned: true
    },
    {
      category: 'Work',
      name: 'Linkedin',
      icon: 'linkedin',
      key: 'KeyL',
      triggers: [
        'l',
        'lk',
        'li',
        'linked',
        'linkedin'
      ],
      url: 'https://linkedin.com',
      normalisedURL: 'linkedin.com',
      commands: {
        search: {
          template: '{@}/search/results/all/?keywords={$}'
        }
      },
      bgColor: {
        type: 'solid',
        color: '#0077b7'
      },
      textColor: '#fff',
      pinned: true
    },
    {
      category: 'Communication',
      name: 'Gmail',
      icon: 'gmail',
      url: 'https://gmail.com',
      normalisedURL: 'gmail.com',
      triggers: [
        'em',
        'gm',
        'mail',
        'gmail'
      ],
      key: 'KeyE',
      commands: {
        search: {
          template: '{@}/#search/{$}'
        }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        angle: 45,
        colors: ['#df493b', '#e8e8e8'],
        stops: [50, 100]
      },
      textColor: '#e8e8e8',
      pinned: true
    },
    {
      category: 'Work',
      name: 'Google Drive',
      triggers: [
        'gd',
        'drive',
        'gdrive',
        'google',
      ],
      icon: 'gdrive',
      url: 'https://drive.google.com',
      normalisedURL: 'drive.google.com',
      bgColor: {
        type: 'gradient',
        angle: 70,
        gradientType: 'linear',
        colors: ['#2684fc', '#00ac47', '#ffba00']
      },
      textColor: '#fff',
      pinned: true
    },
    {
      category: 'Shopping',
      name: 'Amazon',
      triggers: [
        'a',
        'am',
        'amz',
        'amazon',
      ],
      icon: 'amazon',
      key: 'KeyA',
      url: 'https://www.amazon.com/',
      normalisedURL: 'amazon.com',
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        colors: ['#f29100', '#fff'],
        stops: [0, 80]
      },
      textColor: '#000',
      pinned: true
    },
    {
      category: 'Education',
      name: 'Wikipedia',
      icon: 'wikipedia',
      triggers: [
        'wi',
        'wiki',
        'wikipedia'
      ],
      url: 'https://www.wikipedia.org',
      normalisedURL: 'wikipedia.org',
      commands: {
        search: {
          template: '{@}/?search={$}'
        },
        go: {
          template: '{@}/wiki/{$}'
        }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        colors: ['#e1e1e3', '#bbb'],
        stops: [60, 100]
      },
      textColor: '#000',
      pinned: true
    },
    {
      category: 'Work',
      name: 'Slack',
      icon: 'slack',
      triggers: [
        'sl',
        'slack'
      ],
      url: 'https://app.slack.com',
      normalisedURL: 'slack.com',
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        angle: -200,
        colors: ['#d6abb9', '#e6d7b8', '#bce2eb', '#8db0a4']
      },
      textColor: '#00bd6d',
    },
    {
      category: 'Social',
      name: 'VK',
      triggers: [
        'v',
        'vk',
        'vkontakte',
      ],
      url: 'https://vk.com',
      normalisedURL: 'vk.com',
      commands: {
        go: {
          template: '{@}/{$}',
          description: 'go to'
        },
        search: {
          template: '{@}/search?c%5Bq%5D={$}&c%5Bsection%5D=auto'
        }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        colors: ['#0077ff', '#0033ff']
      },
      textColor: '#e8e8e8'
    },
    {
      category: 'Search',
      name: 'DuckDuckGo',
      triggers: [
        'dd',
        'ddg',
        'duck',
        'duckduck',
        'duckduckgo'
      ],
      url: 'https://duckduckgo.com',
      normalisedURL: 'duckduckgo.com',
      commands: {
        search: {
          template: '{@}/?q={$}'
        }
      },
      bgColor: {
        type: 'solid',
        color: '#e37151'
      },
      textColor: '#e8e8e8'
    },
    {
      category: 'Search',
      name: 'Bing',
      triggers: [
        'b',
        'bing',
      ],
      url: 'https://www.bing.com',
      normalisedURL: 'bing.com',
      commands: {
        search: {
          template: '{@}/search?q={$}'
        }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        colors: ['#3ab0f1', '#2351dd', '#40d1da']
      },
      textColor: '#e8e8e8'
    },
    {
      category: 'Search',
      name: 'Yandex',
      triggers: [
        'ya',
        'yandex'
      ],
      url: 'https://ya.ru',
      normalisedURL: 'ya.ru',
      commands: {
        search: {
          template: '{@}/search/?text={$}'
        }
      },
      bgColor: {
        type: 'solid',
        color: '#fc3f1d'
      },
      textColor: '#000'
    },
  ],
  commands: [
    {
      type: 'search',
      trigger: '?'
    },
    {
      type: 'go',
      trigger: '/'
    }
  ],
  engines: {
    google: {
      name: 'Google',
      bgColor: {
        type: 'solid',
        color: '#aaa'
      },
      textColor: '#fff',
      types: {
        // @ - origin query (what user typed); $ - final query (what is in the query field (selected))
        query: {
          template: 'https://www.google.com/search?q={$}'
        },
        calculator: {
          template: 'https://www.google.com/search?q={@}'
        },
        currency: {
          template: 'https://www.google.com/search?q={@}'
        }
      }
    },
    duckDuckGo: {
      name: 'DuckDuckGo',
      bgColor: {
        type: 'solid',
        color: '#e37151'
      },
      textColor: '#e8e8e8',
      types: {
        query: {
          template: 'https://duckduckgo.com/?q={$}'
        },
        calculator: {
          template: 'https://duckduckgo.com/?q={@}'
        },
        currency: {
          template: 'https://duckduckgo.com/?q={@}'
        }
      }
    },
    yandex: {
      name: 'Yandex',
      bgColor: {
        type: 'solid',
        color: '#fc3f1d'
      },
      textColor: '#000',
      types: {
        query: {
          template: 'https://ya.ru/search/?text={$}'
        },
        calculator: {
          template: 'https://ya.ru/search/?text={@}'
        },
        currency: {
          template: 'https://ya.ru/search/?text={@}'
        }
      }
    },
    qwant: {
      name: 'Qwant',
      bgColor: {
        type: 'solid',
        color: '#5992f7'
      },
      textColor: '#000',
      types: {
        query: {
          template: 'https://www.qwant.com/?q={$}'
        },
        calculator: {
          template: 'https://www.qwant.com/?q={@}'
        },
        currency: {
          template: 'https://www.qwant.com/?q={@}'
        }
      }
    },
    bing: {
      name: 'Bing',
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        colors: ['#3ab0f1', '#2351dd', '#40d1da']
      },
      textColor: '#e8e8e8',
      types: {
        query: {
          template: 'https://www.bing.com/search?q={$}'
        },
        calculator: {
          template: 'https://www.bing.com/search?q={@}'
        },
        currency: {
          template: 'https://www.bing.com/search?q={@}'
        }
      }
    },
    brave: {
      name: 'Brave',
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        colors: ['#FB542B', '#343546']
      },
      textColor: '#e8e8e8',
      types: {
        query: {
          template: 'https://search.brave.com/search?q={$}'
        },
        calculator: {
          template: 'https://search.brave.com/search?q={@}'
        },
        currency: {
          template: 'https://search.brave.com/search?q={@}'
        }
      }
    }
  }
}
