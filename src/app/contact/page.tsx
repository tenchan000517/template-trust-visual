"use client";

import { useState } from "react";
import Link from "next/link";
import { contact } from "@/lib/site";
import { FadeInUp } from "@/components/animations";

// フォームの状態
interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  privacy: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  type?: string;
  message?: string;
  privacy?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    type: "",
    message: "",
    privacy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // バリデーション
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "お名前を入力してください";
    }

    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "正しいメールアドレスを入力してください";
    }

    if (!formData.type) {
      newErrors.type = "お問い合わせ種別を選択してください";
    }

    if (!formData.message.trim()) {
      newErrors.message = "お問い合わせ内容を入力してください";
    }

    if (!formData.privacy) {
      newErrors.privacy = "個人情報の取り扱いに同意してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsCompleted(true);
      } else {
        // バリデーションエラーの場合
        if (result.errors && Array.isArray(result.errors)) {
          const newErrors: FormErrors = {};
          result.errors.forEach((err: { field: string; message: string }) => {
            newErrors[err.field as keyof FormErrors] = err.message;
          });
          setErrors(newErrors);
        } else {
          alert(result.message || "送信中にエラーが発生しました。");
        }
      }
    } catch (error) {
      console.error("送信エラー:", error);
      alert("送信中にエラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 入力変更ハンドラ
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // エラーをクリア
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // 完了画面
  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite py-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-lg p-8 lg:p-12 shadow-sm">
            {/* チェックマーク */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-main mb-4">
              お問い合わせありがとうございます
            </h1>
            <p className="text-base text-secondary leading-relaxed mb-8">
              お問い合わせを受け付けました。
              <br />
              1営業日以内に担当者よりご連絡いたします。
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-btn font-semibold text-base bg-main text-white hover:bg-main-dark transition-all"
            >
              TOPへ戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ============================================
          セクション1: ページヒーロー（Page Hero）
          ============================================ */}
      <section className="relative min-h-[30vh] lg:min-h-[30vh] flex items-center justify-center bg-offwhite">
        <div className="max-w-container mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          {/* ページタイトル */}
          <FadeInUp>
            <h1 className="text-4xl lg:text-[56px] font-bold text-main mb-8">
              お問い合わせ
            </h1>
          </FadeInUp>

          {/* 安心ポイント */}
          <FadeInUp delay={100}>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-12">
              {["ご相談無料", "24時間受付", "1営業日以内にご返信"].map(
                (point, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-main"
                  >
                    <span className="text-accent font-bold">✓</span>
                    <span className="text-base">{point}</span>
                  </div>
                )
              )}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ============================================
          セクション2: 問い合わせ前の確認（Pre-form Info）
          ============================================ */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-[600px] mx-auto px-4 text-center">
          <p className="text-sm lg:text-base text-secondary leading-relaxed">
            お問い合わせいただいた内容は、1営業日以内にメールまたはお電話でご返信いたします。
            <br className="hidden lg:block" />
            お急ぎの場合は、お電話（
            <a
              href={`tel:${contact.phoneTel}`}
              className="text-accent font-medium hover:underline"
            >
              {contact.phoneFormatted}
            </a>
            ）でも承っております。
          </p>
        </div>
      </section>

      {/* ============================================
          セクション3: お問い合わせフォーム（Contact Form）
          ============================================ */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[600px] mx-auto px-4">
          <form onSubmit={handleSubmit}>
            {/* お名前 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-main mb-2">
                お名前
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-main/20 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-main"
                }`}
                placeholder="山田 太郎"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* 会社名 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-main mb-2">
                会社名
                <span className="text-muted text-xs ml-2">（任意）</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main"
                placeholder="株式会社〇〇"
              />
            </div>

            {/* メールアドレス */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-main mb-2">
                メールアドレス
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-main/20 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-main"
                }`}
                placeholder="example@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* 電話番号 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-main mb-2">
                電話番号
                <span className="text-muted text-xs ml-2">（任意）</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main"
                placeholder="03-1234-5678"
              />
            </div>

            {/* お問い合わせ種別 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-main mb-2">
                お問い合わせ種別
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-main/20 bg-white ${
                  errors.type
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-main"
                }`}
              >
                <option value="">選択してください</option>
                <option value="estimate">お見積もりのご依頼</option>
                <option value="consultation">サービスに関するご相談</option>
                <option value="other">その他のお問い合わせ</option>
              </select>
              {errors.type && (
                <p className="text-sm text-red-500 mt-1">{errors.type}</p>
              )}
            </div>

            {/* お問い合わせ内容 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-main mb-2">
                お問い合わせ内容
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 text-base border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-main/20 resize-y ${
                  errors.message
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-main"
                }`}
                placeholder="お問い合わせ内容をご記入ください"
              />
              {errors.message && (
                <p className="text-sm text-red-500 mt-1">{errors.message}</p>
              )}
            </div>

            {/* 個人情報の取り扱い */}
            <div className="mb-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleChange}
                  className="w-5 h-5 mt-0.5 accent-accent"
                />
                <span className="text-sm text-main">
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="text-accent hover:underline"
                  >
                    個人情報の取り扱い
                  </Link>
                  に同意する
                  <span className="text-red-500 ml-1">*</span>
                </span>
              </label>
              {errors.privacy && (
                <p className="text-sm text-red-500 mt-1 ml-8">
                  {errors.privacy}
                </p>
              )}
            </div>

            {/* 送信ボタン */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-[280px] h-14 rounded-btn font-semibold text-lg transition-all ${
                  isSubmitting
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-accent text-white hover:bg-accent-dark"
                }`}
              >
                {isSubmitting ? "送信中..." : "送信する"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ============================================
          セクション4: 電話・その他の問い合わせ方法
          ============================================ */}
      <section className="py-12 lg:py-16 bg-offwhite">
        <div className="max-w-container mx-auto px-4 text-center">
          <h3 className="text-lg lg:text-xl font-semibold text-main mb-4">
            お電話でのお問い合わせ
          </h3>
          <a
            href={`tel:${contact.phoneTel}`}
            className="text-2xl lg:text-[32px] font-bold text-main hover:text-accent transition-colors"
          >
            {contact.phoneFormatted}
          </a>
          <p className="text-sm text-muted mt-2">{contact.hours}</p>
        </div>
      </section>
    </>
  );
}
