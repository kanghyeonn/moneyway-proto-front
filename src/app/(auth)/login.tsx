import { Image } from "expo-image";
import { router, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
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

const features = [
  {
    icon: "bar-chart",
    iconColor: "#0b5cff",
    backgroundColor: "#eef6ff",
    title: "당일 시장 동향",
    description: "거래대금, 거래량, 급등락 등\n주요 지표를 한눈에",
  },
  {
    icon: "pie-chart",
    iconColor: "#14b8a6",
    backgroundColor: "#eefdf8",
    title: "섹터·테마 랭킹",
    description: "당일 기준 섹터/테마 순위를\n실시간으로 확인",
  },
  {
    icon: "flash",
    iconColor: "#f59e0b",
    backgroundColor: "#fff7ed",
    title: "주요 종목 정보",
    description: "상위 종목의 가격, 등락률,\n거래대금 정보 제공",
  },
  {
    icon: "star",
    iconColor: "#7c3aed",
    backgroundColor: "#f5f3ff",
    title: "관심 종목 관리",
    description: "관심 종목을 등록하고\n쉽게 모니터링",
  },
] as const;

export default function LoginScreen() {
  const [autoLogin, setAutoLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { error, isGoogleLoading, signInWithGoogle } = useAuth();

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
          <View style={styles.hero}>
            <Image
              source={require("../../../assets/images/login/main-illust.png")}
              style={styles.heroImage}
              contentFit="contain"
            />

            <View style={styles.heroTextRow}>
              <View style={styles.logoCard}>
                <Image
                  source={require("../../../assets/images/login/login-logo.png")}
                  style={styles.logoImage}
                  contentFit="contain"
                />
              </View>
              <View style={styles.heroCopy}>
                <Text style={styles.brandTitle}>발견</Text>
                <Text style={styles.brandSubtitle}>
                  시장의 흐름을 빠르게 발견하세요
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.titleBlock}>
            <Text style={styles.title}>로그인</Text>
            <Text style={styles.subtitle}>
              계정에 로그인하여 더 많은 정보를 확인하세요
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputBox}>
              <Ionicons name="person-outline" size={18} color="#8b95aa" />
              <TextInput
                style={styles.input}
                placeholder="이메일 또는 휴대폰 번호"
                placeholderTextColor="#9aa3b8"
                autoCapitalize="none"
                keyboardType="email-address"
              />
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
          </View>

          <View style={styles.optionRow}>
            <Pressable
              onPress={() => setAutoLogin((checked) => !checked)}
              style={styles.checkRow}
            >
              <View style={[styles.checkbox, autoLogin && styles.checkboxActive]}>
                {autoLogin ? (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                ) : null}
              </View>
              <Text style={styles.optionText}>자동 로그인</Text>
            </Pressable>

            <Pressable>
              <Text style={styles.findPasswordText}>비밀번호 찾기</Text>
            </Pressable>
          </View>

          <Pressable style={styles.loginButton}>
            <Text style={styles.loginButtonText}>로그인</Text>
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
              onPress={() => signInWithGoogle()}
              style={[
                styles.socialButton,
                isGoogleLoading && styles.socialButtonDisabled,
              ]}
            >
              <Text style={styles.googleMark}>G</Text>
              <Text style={styles.socialText}>
                {isGoogleLoading ? "Google 로그인 중" : "Google로 로그인"}
              </Text>
            </Pressable>

            <Pressable style={styles.socialButton}>
              <Ionicons name="logo-apple" size={20} color="#111827" />
              <Text style={styles.socialText}>Apple로 로그인</Text>
            </Pressable>
          </View>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>계정이 없으신가요?</Text>
            <Pressable onPress={() => router.push("/signup" as Href)}>
              <Text style={styles.signupLink}>회원가입</Text>
            </Pressable>
          </View>

          <View style={styles.featureGrid}>
            {features.map((feature) => (
              <View key={feature.title} style={styles.featureItem}>
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: feature.backgroundColor },
                  ]}
                >
                  <Ionicons
                    name={feature.icon}
                    size={22}
                    color={feature.iconColor}
                  />
                </View>
                <View style={styles.featureCopy}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.footerText}>
            로그인하면 발견의 모든 기능을 이용하실 수 있습니다.{"\n"}
            이용 중 문제가 발생하면 고객센터로 문의해주세요.
          </Text>
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
    paddingTop: 30,
    paddingBottom: 38,
  },
  hero: {
    minHeight: 152,
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
    fontSize: 22,
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
    right: -24,
    top: -4,
    width: 184,
    height: 190,
    opacity: 0.96,
    shadowColor: "#5ca4ff",
    shadowOffset: { width: -8, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
  },
  titleBlock: {
    marginTop: 4,
    gap: 10,
  },
  title: {
    color: "#111827",
    fontSize: 25,
    fontWeight: "900",
  },
  subtitle: {
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
  optionRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  optionText: {
    color: "#4b5565",
    fontSize: 12,
    fontWeight: "700",
  },
  findPasswordText: {
    color: "#4b5565",
    fontSize: 12,
    fontWeight: "700",
  },
  loginButton: {
    height: 48,
    marginTop: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#005cff",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
  },
  dividerRow: {
    marginTop: 22,
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
  signupRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  signupText: {
    color: "#6b7280",
    fontSize: 11,
    fontWeight: "600",
  },
  signupLink: {
    color: "#005cff",
    fontSize: 11,
    fontWeight: "900",
  },
  featureGrid: {
    marginTop: 30,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 22,
    backgroundColor: "#f8fafc",
  },
  featureItem: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingRight: 2,
  },
  featureIcon: {
    width: 39,
    height: 39,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  featureCopy: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    color: "#111827",
    fontSize: 11,
    fontWeight: "900",
  },
  featureDescription: {
    color: "#374151",
    fontSize: 9,
    fontWeight: "600",
    lineHeight: 15,
  },
  footerText: {
    marginTop: 30,
    color: "#6b7280",
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 18,
  },
});
