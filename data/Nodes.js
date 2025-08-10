import { Sheet, Send, Workflow, } from 'lucide-react'
import { IconBrandTelegram, IconRoute2, IconBrandFacebook, IconBrandInstagram, IconWebhook, IconFileSpreadsheet } from '@tabler/icons-react';



const baseX = 300;
const baseY = 150;
const gap = 50;



const rawNodes = [
  {
    id: 1,
    label: 'Google Sheet',
    description: 'Google Sheet to read...',
    icon: <IconFileSpreadsheet />,
    color: '#0F9D58',
    type: 'sheet',
    module: 'module:sheet'
  },
  {
    id: 2,
    label: 'Router',
    description: 'Router to connect nodes',
    icon: <IconRoute2 />,
    color: '#6366F1',
    type: 'router',
    module: 'module:router'
  },
  {
    id: 3,
    label: 'Telegram',
    description: 'Add telegram api...',
    icon: <IconBrandTelegram />,
    color: '#0088cc',
    type: 'telegram',
    module: 'module:telegram'
  },

  {
    id: 4,
    label: 'Facebook',
    description: 'Add Facebook api...',
    icon: <IconBrandFacebook />,
    color: '#1877F2',
    type: 'facebook',
    module: 'module:facebook'
  },

  {
    id: 5,
    label: 'Facebook Page',
    description: 'Add Facebook api...',
    icon: <IconBrandFacebook />,
    color: '#1877F2',
    type: 'facebook_page',
    module: 'module:facebook_page'
  },

  {
    id: 6,
    label: 'Instagram',
    description: 'Add Instagram api...',
    icon: <IconBrandInstagram />,
    color: '#E1306C',
    type: 'instagram',
    module: 'module:instagram'
  },

  {
    id: 7,
    label: 'Webhook',
    description: 'Receive data',
    icon: <IconWebhook />,
    color: '#6366F1',
    type: 'webhook',
    module: 'module:webhook'
  },
];

// Dynamically add position using map
export const availableNodes = rawNodes.map((node, index) => ({
  ...node,
  position: {
    x: baseX + index * gap,
    y: baseY + index * gap,
  },
}));
