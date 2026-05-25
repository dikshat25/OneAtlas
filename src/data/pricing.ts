export const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for individuals getting started with OneAtlas.',
    features: [
      { text: '3 apps', included: true },
      { text: 'Community templates', included: true },
      { text: '1 deployment', included: true },
      { text: '1 user', included: true },
      { text: 'Custom domains', included: false },
      { text: 'Priority AI', included: false },
      { text: 'Team features', included: false },
    ]
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For professionals building complex operational tools.',
    isPopular: true,
    features: [
      { text: 'Unlimited apps', included: true },
      { text: 'All templates', included: true },
      { text: 'Custom domains', included: true },
      { text: 'Priority AI routing', included: true },
      { text: '5 team members', included: true },
      { text: 'Version history', included: true },
      { text: 'SSO', included: false },
      { text: 'Audit logs', included: false },
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large teams requiring advanced security and support.',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'SSO & SAML', included: true },
      { text: 'RBAC', included: true },
      { text: 'Audit logs', included: true },
      { text: 'Dedicated infrastructure', included: true },
      { text: 'Custom SLA', included: true },
      { text: 'Dedicated support', included: true },
    ]
  }
]
