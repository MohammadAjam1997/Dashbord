<template>
  <KTLoader v-if="loaderEnabled" :logo="loaderLogo" />

  <!-- begin:: Body -->
  <div class="page d-flex flex-row flex-column-fluid">
    <!-- begin:: Aside Left -->
    <KTAside
      v-if="asideEnabled"
      :lightLogo="themeLightLogo"
      :darkLogo="themeDarkLogo"
    />
    <!-- end:: Aside Left -->

    <div id="kt_wrapper" class="wrapper d-flex flex-column flex-row-fluid">
      <KTHeader />

      <!-- begin:: Content -->
      <div id="kt_content" class="content d-flex flex-column flex-column-fluid">
        <!-- begin:: Content Body -->
        <div
          id="kt_content_container"
          :class="{
            'container-fluid': contentWidthFluid,
            'container-xxl': !contentWidthFluid,
          }"
        >
          <router-view />
        </div>
        <!-- end:: Content Body -->
      </div>
      <!-- end:: Content -->
      <KTFooter />
    </div>
  </div>
  <!-- end:: Body -->
  <KTScrollTop />
  <KTMessengerDrawer />
  <KTActivityDrawer />
  <KTCreateApp />
  <KTInviteFriendsModal />
  <KTUpgradePlanModal />

  <KTToolbarButtons />
  <KTDemosDrawer />
  <KTHelpDrawer />
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import KTAside from "@/layouts/main-layout/aside/Aside.vue";
import KTHeader from "@/layouts/main-layout/header/Header.vue";
import KTFooter from "@/layouts/main-layout/footer/Footer.vue";
import HtmlClass from "@/core/services/LayoutService";
import KTScrollTop from "@/layouts/main-layout/extras/ScrollTop.vue";
import KTActivityDrawer from "@/layouts/main-layout/drawers/ActivityDrawer.vue";
import KTLoader from "@/components/Loader.vue";
import KTCreateApp from "@/components/modals/wizards/create-app-modal/CreateAppModal.vue";
import KTInviteFriendsModal from "@/components/modals/general/InviteFriendsModal.vue";
import KTUpgradePlanModal from "@/components/modals/general/UpgradePlanModal.vue";
import KTToolbarButtons from "@/layouts/main-layout/extras/ToolbarButtons.vue";
import KTDemosDrawer from "@/layouts/main-layout/extras/DemosDrawer.vue";
import KTHelpDrawer from "@/layouts/main-layout/extras/HelpDrawer.vue";
import KTMessengerDrawer from "@/layouts/main-layout/extras/MessengerDrawer.vue";
import { Actions } from "@/store/enums/StoreEnums";
import { MenuComponent } from "@/assets/ts/components";
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import { removeModalBackdrop } from "@/core/helpers/dom";
import {
  toolbarDisplay,
  loaderEnabled,
  contentWidthFluid,
  loaderLogo,
  asideEnabled,
  subheaderDisplay,
  themeLightLogo,
  themeDarkLogo,
} from "@/core/helpers/config";

export default defineComponent({
  name: "master-layout",
  components: {
    KTAside,
    KTHeader,
    KTFooter,
    KTScrollTop,
    KTCreateApp,
    KTInviteFriendsModal,
    KTUpgradePlanModal,
    KTActivityDrawer,
    KTToolbarButtons,
    KTDemosDrawer,
    KTHelpDrawer,
    KTMessengerDrawer,
    KTLoader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    // show page loading
    store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading");

    onMounted(() => {
      //check if current user is authenticated
      if (!store.getters.isUserAuthenticated) {
        router.push({ name: "sign-in" });
      }

      // initialize html element classes
      HtmlClass.init();

      nextTick(() => {
        reinitializeComponents();
      });

      // Simulate the delay page loading
      setTimeout(() => {
        // Remove page loader after some time
        store.dispatch(Actions.REMOVE_BODY_CLASSNAME, "page-loading");
      }, 500);
    });

    watch(
      () => route.path,
      () => {
        MenuComponent.hideDropdowns(undefined);

        // check if current user is authenticated
        if (!store.getters.isUserAuthenticated) {
          router.push({ name: "sign-in" });
        }

        nextTick(() => {
          reinitializeComponents();
        });
        removeModalBackdrop();
      }
    );

    return {
      toolbarDisplay,
      loaderEnabled,
      contentWidthFluid,
      loaderLogo,
      asideEnabled,
      subheaderDisplay,
      themeLightLogo,
      themeDarkLogo,
    };
  },
});
</script>
