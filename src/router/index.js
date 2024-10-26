import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/mua-xe',
                    name: 'mua-xe',
                    component: () => import('@/views/uikit/Search.vue')
                },
                {
                    path: '/ban-xe',
                    name: 'ban-xe',
                    component: () => import('@/views/uikit/Banxe.vue')
                },
                {
                    path: '/ban-xe/dang-tin',
                    name: 'dang-tin',
                    component: () => import('@/views/uikit/Input.vue')
                },
                {
                    path: '/salon-xe',
                    name: 'salon-xe',
                    component: () => import('@/views/uikit/Salon.vue')
                },
                {
                    path: '/salon/:id',
                    name: 'salon-detail',
                    component: () => import('@/views/uikit/SalonDetail.vue')
                },
                {
                    path: '/phu-tung',
                    name: 'phu-tung',
                    component: () => import('@/views/uikit/PhuTung.vue')
                },
                {
                    path: '/detail/:id',
                    name: 'detail',
                    component: () => import('@/views/uikit/Detail.vue')
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/Button.vue')
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/Table.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/Tree.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/Panels.vue')
                },

                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/Overlay.vue')
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/Media.vue')
                },
                {
                    path: '/uikit/menu',
                    component: () => import('@/views/uikit/Menu.vue'),
                    children: [
                        {
                            path: '/uikit/menu',
                            component: () => import('@/views/uikit/menu/PersonalDemo.vue')
                        },
                        {
                            path: '/uikit/menu/seat',
                            component: () => import('@/views/uikit/menu/SeatDemo.vue')
                        },
                        {
                            path: '/uikit/menu/payment',
                            component: () => import('@/views/uikit/menu/PaymentDemo.vue')
                        },
                        {
                            path: '/uikit/menu/confirmation',
                            component: () => import('@/views/uikit/menu/ConfirmationDemo.vue')
                        }
                    ]
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/Messages.vue')
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/File.vue')
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/Chart.vue')
                },
                {
                    path: '/uikit/misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/Misc.vue')
                },
                {
                    path: '/blocks',
                    name: 'blocks',
                    component: () => import('@/views/utilities/Blocks.vue')
                },
                {
                    path: '/utilities/icons',
                    name: 'icons',
                    component: () => import('@/views/utilities/Icons.vue')
                },
                {
                    path: '/pages/timeline',
                    name: 'timeline',
                    component: () => import('@/views/pages/Timeline.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/utilities/Documentation.vue')
                }
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/views/uikit/Admin.vue'),
            children: [
                {
                    path: '/admin',
                    name: 'user',
                    component: () => import('@/views/uikit/UserManagement.vue')
                },
                {
                    path: '/brand-car',
                    name: 'brand-car',
                    component: () => import('@/views/uikit/BrandCar.vue')
                },
                {
                    path: '/model-car',
                    name: 'model-car',
                    component: () => import('@/views/uikit/ModelCar.vue')
                },
                {
                    path: '/style-car',
                    name: 'style-car',
                    component: () => import('@/views/uikit/StyleCar.vue')
                },
                {
                    path: '/origin-car',
                    name: 'origin-car',
                    component: () => import('@/views/uikit/OriginCar.vue')
                },
                {
                    path: '/fuel-car',
                    name: 'fuel-car',
                    component: () => import('@/views/uikit/FuelCar.vue')
                },
                {
                    path: '/color-car',
                    name: 'color-car',
                    component: () => import('@/views/uikit/ColorCar.vue')
                },
                {
                    path: '/setting',
                    name: 'setting',
                    component: () => import('@/views/uikit/Setting.vue')
                },
                {
                    path: '/seller',
                    name: 'seller',
                    component: () => import('@/views/uikit/Seller.vue')
                },
                {
                    path: '/buyer',
                    name: 'buyer',
                    component: () => import('@/views/uikit/Buyer.vue')
                },
                {
                    path: '/seller/:id',
                    name: 'sellerDetail',
                    component: () => import('@/views/uikit/SellerDetail.vue')
                },
                {
                    path: '/buyer/:id',
                    name: 'buyerDetail',
                    component: () => import('@/views/uikit/BuyerDetail.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/register',
            name: 'register',
            component: () => import('@/views/pages/auth/Register.vue')
        },
        {
            path: '/auth/forgot-password',
            name: 'forgot-password',
            component: () => import('@/views/pages/auth/ForgotPassword.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
