import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { useTokenCookie } from '../service/useTokenCookie';
const { getTokenCookie } = useTokenCookie();

function isAuthenticated() {
    // Check token or use any auth state management logic here
    return getTokenCookie();
}
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
                    component: () => import('@/views/uikit/Banxe.vue'),
                    meta: { requiresAuth: true }
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
            ],
            meta: { requiresAuth: true }
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
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!isAuthenticated()) {
            next({ name: 'login' });
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;
