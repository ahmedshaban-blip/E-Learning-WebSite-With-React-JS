
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { enrollCourseForUser, getCurrentUser } from "../lib/firebase";
import { addCourseToLocal } from "../lib/localStorage";
import { useTranslation } from "react-i18next";

const PAYPAL_CLIENT_ID =
  "AfRmOOCW11OKIFMth_edpRxSIxXXFULLnbgN34hI-8T-8Tm9w-K6VSQu5okxwZeMj5FFVN79SnFPUR1A";
const CURRENCY = "USD";

export default function PayPalCheckout() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const buttonsRef = useRef(null);            // حاوية الأزرار
  const buttonsInstanceRef = useRef(null);    // مرجع للـ Buttons API
  const renderedRef = useRef(false);          // منع التكرار (StrictMode وغيره)
  const removeLoadListenerRef = useRef(null); // لتنضيف الـlistener

  useEffect(() => {
    if (!state?.course || !buttonsRef.current) return;

    const sdkSrc = `https://www.sandbox.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${CURRENCY}&components=buttons&intent=capture&enable-funding=card`;

    const renderButtons = () => {
      if (renderedRef.current || !window.paypal || !buttonsRef.current) return;

      // نظّف الحاوية قبل الرندر
      buttonsRef.current.innerHTML = "";
      renderedRef.current = true;

      const buttons = window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal",
          height: 45,
          tagline: false,
        },
        createOrder: (_, actions) =>
          actions.order.create({
            purchase_units: [
              {
                amount: { value: String(state.course.price || 0) },
                description: state.course.title,
              },
            ],
          }),
        onApprove: async (_, actions) => {
          const details = await actions.order.capture();

          const user = getCurrentUser();
          const enrolled = {
            courseId: state.course.id,
            title: state.course.title,
            imageUrl: state.course.imageUrl,
            price: state.course.price,
            enrolledAt: new Date().toISOString(),
            paymentId: details?.id,
          };

          if (user?.uid) {
            await enrollCourseForUser(user.uid, enrolled);
            addCourseToLocal(user.uid, enrolled);
          } else {
            addCourseToLocal("guest", enrolled);
          }

          navigate("/my-courses", { replace: true });
        },
        onError: (err) => {
          console.error(t("checkout.alerts.errorTitle"), err);
          alert(t("checkout.alerts.failed"));
        },
      });

      buttonsInstanceRef.current = buttons;
      buttons.render(buttonsRef.current);
    };

    // 1) لو الـSDK جاهز بالفعل
    if (window.paypal) {
      renderButtons();
    } else {
      // 2) حمّل السكريبت أو استنى تحميله لو كان مضاف
      let script = document.querySelector(`script[src="${sdkSrc}"]`);
      const onLoad = () => renderButtons();

      if (!script) {
        script = document.createElement("script");
        script.src = sdkSrc;
        script.async = true;
        script.addEventListener("load", onLoad, { once: true });
        document.body.appendChild(script);
        removeLoadListenerRef.current = () =>
          script.removeEventListener("load", onLoad);
      } else {
        script.addEventListener("load", onLoad, { once: true });
        removeLoadListenerRef.current = () =>
          script.removeEventListener("load", onLoad);
      }
    }

    // Cleanup
    return () => {
      renderedRef.current = false;

      if (removeLoadListenerRef.current) {
        // eslint-disable-next-line no-empty
        try { removeLoadListenerRef.current(); } catch {}
        removeLoadListenerRef.current = null;
      }

      if (buttonsInstanceRef.current) {
        // eslint-disable-next-line no-empty
        try { buttonsInstanceRef.current.close(); } catch {}
        buttonsInstanceRef.current = null;
      }

      if (buttonsRef.current) buttonsRef.current.innerHTML = "";
    };
  }, [state?.course, t]);

  if (!state?.course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {t("checkout.empty.title")}
          </h2>
        <p className="text-gray-600">{t("checkout.empty.subtitle")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("checkout.header.title")}
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            {t("checkout.header.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {t("checkout.summary.title")}
            </h2>

            <div className="space-y-6">
              {state.course.imageUrl && (
                <div className="relative">
                  <img
                    src={state.course.imageUrl}
                    alt={state.course.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {t("checkout.summary.badge")}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {state.course.title}
                </h3>
                {state.course.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {state.course.description}
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  {t("checkout.summary.whatsIncluded")}
                </h4>
                <div className="space-y-3">
                  {[
                    t("checkout.summary.features.lifetimeAccess"),
                    t("checkout.summary.features.certificate"),
                    t("checkout.summary.features.multiDevice"),
                    t("checkout.summary.features.support247"),
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">
                    {t("checkout.pricing.coursePrice")}
                  </span>
                  <span className="text-gray-900 font-medium">
                    ${state.course.price}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">
                    {t("checkout.pricing.platformFee")}
                  </span>
                  <span className="text-gray-900 font-medium">$0.00</span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      {t("checkout.pricing.total")}
                    </span>
                    <span className="text-2xl font-bold text-orange-600">
                      ${state.course.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {t("checkout.payment.title")}
            </h2>

            {/* Security Badge */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-green-800">
                    {t("checkout.payment.secure.title")}
                  </p>
                  <p className="text-xs text-green-600">
                    {t("checkout.payment.secure.subtitle")}
                  </p>
                </div>
              </div>
            </div>

            {/* PayPal Button Container */}
            <div className="space-y-4">
              <div className="text-sm text-gray-600 text-center mb-4">
                {t("checkout.payment.helper")}
              </div>

              {/* مكان زرار PayPal */}
              <div ref={buttonsRef} className="min-h-[45px]" />

              {/* Alternative payment note */}
              <div className="text-center">
                <p className="text-xs text-gray-500 mt-4">
                  {t("checkout.payment.termsNote.prefix")}{" "}
                  <a href="#" className="text-orange-600 hover:text-orange-700 underline">
                    {t("checkout.payment.termsNote.tos")}
                  </a>{" "}
                  {t("checkout.payment.termsNote.and")}{" "}
                  <a href="#" className="text-orange-600 hover:text-orange-700 underline">
                    {t("checkout.payment.termsNote.privacy")}
                  </a>
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("checkout.trust.ssl")}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("checkout.trust.moneyBack")}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("checkout.trust.support247")}
                </div>
              </div>
            </div>
          </div>
          {/* /Payment Section */}
        </div>
      </div>
    </div>
  );
}
