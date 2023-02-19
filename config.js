const CONFIG = {
  /*
    macroses:
    {
      category: string
      name: string
      triggers: array<string> (query triggers for the macros)
      key: number (key.code for key combination)
      url: string (url of the macros)
      normalisedURL: (normalised url domain)
      commands: {
        command_name: {
          pattern ({@} - url; {$} - argument)
          description
        }
        search: '/#search/text={}',
        ...
      }
      bgColor: string / array<string> (background color, 1 color or 2 colors in array)
      pinned: bool
    }
    commands:
    {
      name: sring
    }
  */
  macroses: [
    {
      category: 'Social',
      name: 'Reddit',
      triggers: [
        'r',
        'rd',
        'reddit',
      ],
      key: 'KeyR',
      url: 'https://www.reddit.com',
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
        angle: '',
        colors: ['#f07e23', '#f74300'],
        stops: [0, 100]
      },
      textColor: '#e8e8e8',
      pinned: true
    },
    {
      category: 'Social',
      name: 'VK',
      triggers: [
        'v',
        'vk',
        'vkontakte',
      ],
      key: 'KeyV',
      url: 'https://www.vk.com',
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
        angle: '',
        colors: ['#0077ff', '#0033ff'],
        stops: [0, 100]
      },
      textColor: '#e8e8e8'
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
      url: 'https://www.instagram.com',
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
      category: 'Programming',
      name: 'GitHub',
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
        angle: '',
        colors: ['#e87922', '#ffbe25'],
        stops: [0, 100]
      },
      textColor: '#212121',
      pinned: true
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
      name: 'google',
      bgColor: {
        type: 'solid',
        color: '#aaa'
      },
      textColor: 'white',
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
    }
  }
}

export default CONFIG