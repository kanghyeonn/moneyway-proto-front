import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, type Href } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/auth/AuthContext";

const agreements = [
  { id: "terms", label: "이용약관에 동의합니다. (필수)", required: true },
  {
    id: "privacy",
    label: "개인정보 수집 및 이용에 동의합니다. (필수)",
    required: true,
  },
  { id: "marketing", label: "마케팅 정보 수신에 동의합니다. (선택)", required: false },
] as const;

type AgreementId = (typeof agreements)[number]["id"];

export default function SignupScreen() {
  const { error, isGoogleLoading, signInWithGoogle } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [checkedAgreements, setCheckedAgreements] = useState<
    Record<AgreementId, boolean>
  >({
    terms: true,
    privacy: true,
    marketing: false,
  });

  const toggleAgreement = (id: AgreementId) => {
    setCheckedAgreements((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </Pressable>

          <View style={styles.hero}>
            <Image
              source={require("../../../assets/images/sign-up/main-illust.png")}
              style={styles.heroImage}
              contentFit="contain"
            />

            <View style={styles.heroTextRow}>
              <View style={styles.logoCard}>
                <Image
                  source={require("../../../assets/images/sign-up/sign-up-logo.png")}
                  style={styles.logoImage}
                  contentFit="contain"
                />
              </View>
              <View style={styles.heroCopy}>
                <Text style={styles.brandTitle}>회원가입</Text>
                <Text style={styles.brandSubtitle}>
                  발견의 다양한 기능을 이용해보세요
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.titleBlock}>
            <Text style={styles.sectionTitle}>회원 정보 입력</Text>
            <Text style={styles.sectionDescription}>필수 정보를 입력해 주세요.</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputBox}>
              <Ionicons name="mail-outline" size={18} color="#8b95aa" />
              <TextInput
                style={styles.input}
                placeholder="이메일"
                placeholderTextColor="#9aa3b8"
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <Pressable style={styles.inlineButton}>
                <Text style={styles.inlineButtonText}>중복 확인</Text>
              </Pressable>
            </View>

            <View style={styles.inputBox}>
              <Ionicons name="lock-closed-outline" size={18} color="#8b95aa" />
              <TextInput
                style={styles.input}
                placeholder="비밀번호"
                placeholderTextColor="#9aa3b8"
                secureTextEntry={!passwordVisible}
              />
              <Pressable
                onPress={() => setPasswordVisible((visible) => !visible)}
                hitSlop={10}
              >
                <Ionicons
                  name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                  size={18}
                  color="#8b95aa"
                />
              </Pressable>
            </View>

            <View style={styles.passwordGuideRow}>
              <Text style={styles.passwordGuideText}>
                영문, 숫자, 특수문자 포함 8~20자
              </Text>
              <View style={styles.strengthRow}>
                <Text style={styles.safeText}>안전</Text>
                <View style={styles.strengthTrack}>
                  <View style={styles.strengthFill} />
                  <View style={styles.strengthFill} />
                  <View style={styles.strengthFill} />
                  <View style={styles.strengthRest} />
                </View>
              </View>
            </View>

            <View style={styles.inputBox}>
              <Ionicons name="lock-closed-outline" size={18} color="#8b95aa" />
              <TextInput
                style={styles.input}
                placeholder="비밀번호 확인"
                placeholderTextColor="#9aa3b8"
                secureTextEntry={!confirmPasswordVisible}
              />
              <Pressable
                onPress={() =>
                  setConfirmPasswordVisible((visible) => !visible)
                }
                hitSlop={10}
              >
                <Ionicons
                  name={confirmPasswordVisible ? "eye-outline" : "eye-off-outline"}
                  size={18}
                  color="#8b95aa"
                />
              </Pressable>
            </View>

            <View style={styles.inputBox}>
              <Ionicons name="person-outline" size={18} color="#8b95aa" />
              <TextInput
                style={styles.input}
                placeholder="이름"
                placeholderTextColor="#9aa3b8"
              />
            </View>

            <View style={styles.inputBox}>
              <Ionicons name="call-outline" size={18} color="#8b95aa" />
              <TextInput
                style={styles.input}
                placeholder="휴대폰 번호"
                placeholderTextColor="#9aa3b8"
                keyboardType="phone-pad"
              />
              <Pressable style={styles.inlineButton}>
                <Text style={styles.inlineButtonText}>인증번호 받기</Text>
              </Pressable>
            </View>

            <View style={styles.inputBox}>
              <Ionicons name="shield-checkmark-outline" size={18} color="#8b95aa" />
              <TextInput
                style={styles.input}
                placeholder="인증번호 입력"
                placeholderTextColor="#9aa3b8"
                keyboardType="number-pad"
              />
              <Text style={styles.timerText}>02:59</Text>
            </View>
          </View>

          <View style={styles.agreementList}>
            {agreements.map((agreement) => (
              <View key={agreement.id} style={styles.agreementRow}>
                <Pressable
                  onPress={() => toggleAgreement(agreement.id)}
                  style={styles.agreementCheckRow}
                >
                  <View
                    style={[
                      styles.checkbox,
                      checkedAgreements[agreement.id] && styles.checkboxActive,
                    ]}
                  >
                    {checkedAgreements[agreement.id] ? (
                      <Ionicons name="checkmark" size={14} color="#fff" />
                    ) : null}
                  </View>
                  <Text style={styles.agreementText}>{agreement.label}</Text>
                </Pressable>

                {agreement.required ? (
                  <Pressable style={styles.viewTermsButton}>
                    <Text style={styles.viewTermsText}>보기</Text>
                    <Ionicons name="chevron-forward" size={15} color="#64748b" />
                  </Pressable>
                ) : null}
              </View>
            ))}
          </View>

          <Pressable style={styles.signupButton}>
            <Text style={styles.signupButtonText}>회원가입</Text>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>또는</Text>
            <View style={styles.divider} />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.socialList}>
            <Pressable
              disabled={isGoogleLoading}
              onPress={() =>
                signInWithGoogle({
                  marketingAgreed: checkedAgreements.marketing,
                })
              }
              style={[
                styles.socialButton,
                isGoogleLoading && styles.socialButtonDisabled,
              ]}
            >
              <Text style={styles.googleMark}>G</Text>
              <Text style={styles.socialText}>
                {isGoogleLoading ? "Google 가입 중" : "Google로 가입"}
              </Text>
            </Pressable>

            <Pressable style={styles.socialButton}>
              <Ionicons name="logo-apple" size={20} color="#111827" />
              <Text style={styles.socialText}>Apple로 가입</Text>
            </Pressable>
          </View>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>이미 계정이 있으신가요?</Text>
            <Pressable onPress={() => router.replace("/login" as Href)}>
              <Text style={styles.loginLink}>로그인</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 34,
  },
  backButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -10,
  },
  hero: {
    minHeight: 158,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroTextRow: {
    flex: 1,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoCard: {
    width: 46,
    height: 46,
    borderRadius: 13,
    overflow: "hidden",
    backgroundColor: "#eef4ff",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  heroCopy: {
    flex: 1,
    gap: 6,
  },
  brandTitle: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "900",
  },
  brandSubtitle: {
    color: "#5d667a",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
  },
  heroImage: {
    position: "absolute",
    right: -28,
    top: -18,
    width: 188,
    height: 198,
    opacity: 0.96,
    shadowColor: "#5ca4ff",
    shadowOffset: { width: -8, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
  },
  titleBlock: {
    marginTop: 10,
    gap: 9,
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 19,
    fontWeight: "900",
  },
  sectionDescription: {
    color: "#5d667a",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
  },
  form: {
    marginTop: 22,
    gap: 10,
  },
  inputBox: {
    height: 46,
    borderWidth: 1,
    borderColor: "#dfe4ee",
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    color: "#111827",
    fontSize: 13,
    fontWeight: "600",
  },
  inlineButton: {
    height: 32,
    borderRadius: 9,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f5fa",
  },
  inlineButtonText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "800",
  },
  passwordGuideRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -2,
    paddingHorizontal: 1,
  },
  passwordGuideText: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "700",
  },
  strengthRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  safeText: {
    color: "#0b5cff",
    fontSize: 11,
    fontWeight: "900",
  },
  strengthTrack: {
    flexDirection: "row",
    gap: 4,
  },
  strengthFill: {
    width: 22,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#0b5cff",
  },
  strengthRest: {
    width: 22,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#d8deea",
  },
  timerText: {
    color: "#7b8498",
    fontSize: 13,
    fontWeight: "700",
  },
  agreementList: {
    marginTop: 20,
    gap: 13,
  },
  agreementRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  agreementCheckRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  checkbox: {
    width: 21,
    height: 21,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d7dce8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxActive: {
    borderColor: "#0b5cff",
    backgroundColor: "#0b5cff",
  },
  agreementText: {
    flex: 1,
    color: "#4b5565",
    fontSize: 12,
    fontWeight: "700",
  },
  viewTermsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  viewTermsText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },
  signupButton: {
    height: 48,
    marginTop: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#005cff",
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
  },
  dividerRow: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e9f2",
  },
  dividerText: {
    color: "#6b7280",
    fontSize: 11,
    fontWeight: "700",
  },
  socialList: {
    marginTop: 18,
    gap: 10,
  },
  socialButton: {
    height: 46,
    borderWidth: 1,
    borderColor: "#dfe4ee",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#fff",
  },
  socialButtonDisabled: {
    opacity: 0.65,
  },
  errorText: {
    marginTop: 14,
    color: "#ef4444",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },
  googleMark: {
    color: "#4285f4",
    fontSize: 18,
    fontWeight: "900",
  },
  socialText: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "800",
  },
  loginRow: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  loginText: {
    color: "#6b7280",
    fontSize: 11,
    fontWeight: "600",
  },
  loginLink: {
    color: "#005cff",
    fontSize: 11,
    fontWeight: "900",
  },
});
