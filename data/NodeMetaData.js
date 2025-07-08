import { IconBrandTelegram, IconRoute2, IconBrandFacebook, IconBrandInstagram, IconWebhook, IconFileSpreadsheet } from '@tabler/icons-react';

export const NodeMetaData = async (node) => {

    switch (node.module) {
        case 'module:sheet':
            return {
                ...node,
                color: '#0F9D58',
                icon: <IconFileSpreadsheet />
            }
        case 'module:router':
            return {
                ...node,
                color: '#6366F1',
                icon: <IconRoute2 />
            }

        case 'module:telegram':
            return {
                ...node,
                icon: <IconBrandTelegram />,
                color: '#0088cc',
            }

        case 'module:facebook':
            return {
                ...node,
                icon: <IconBrandFacebook />,
                color: '#1877F2',
            }

        case 'module:facebook_page':
            return {
                ...node,
                icon: <IconBrandFacebook />,
                color: '#1877F2',
            }

        case 'module:instagram':
            return {
                ...node,
                icon: <IconBrandInstagram />,
                color: '#E1306C',
            }

        case 'module:webhook':
            return {
                ...node,
                icon: <IconWebhook />,
                color: '#6366F1',
            }

    }






}