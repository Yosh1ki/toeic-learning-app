import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  View,
  Text,
  ScrollView as RNScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import {
  reinitDatabase,
  getTablesList,
  getTableContent,
  getTableSchema,
  forceUpdateDate,
} from "@/db";

export default function SettingScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [tableContent, setTableContent] = useState<any[]>([]);
  const [tableSchema, setTableSchema] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // データベース情報を取得する関数
  const fetchDatabaseInfo = async () => {
    setLoading(true);
    try {
      const tablesList = await getTablesList();
      setTables(tablesList);
    } catch (error) {
      console.error("テーブル一覧の取得に失敗:", error);
    } finally {
      setLoading(false);
    }
  };

  // テーブルの内容を取得する関数
  const fetchTableContent = async (tableName: string) => {
    setLoading(true);
    try {
      setSelectedTable(tableName);

      // スキーマ情報を取得
      const schema = await getTableSchema(tableName);
      setTableSchema(schema);

      // テーブルの内容を取得
      const content = await getTableContent(tableName);
      setTableContent(content);
    } catch (error) {
      console.error(`テーブル内容の取得に失敗: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // データベースを再初期化する関数
  const handleDatabaseReset = async () => {
    Alert.alert(
      "データベースのリセット",
      "ローカルデータベースをリセットしますか？すべての保存データが削除されます。",
      [
        {
          text: "キャンセル",
          style: "cancel",
        },
        {
          text: "リセット",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await reinitDatabase();
              if (result) {
                Alert.alert("成功", "データベースが正常にリセットされました。");
                // リセット後にテーブル一覧を更新
                fetchDatabaseInfo();
              } else {
                Alert.alert(
                  "エラー",
                  "データベースのリセット中にエラーが発生しました。"
                );
              }
            } catch (error) {
              console.error("データベースリセットエラー:", error);
              Alert.alert(
                "エラー",
                "データベースのリセット中にエラーが発生しました。"
              );
            }
          },
        },
      ]
    );
  };

  // 日付を修正する関数
  const handleDateFix = async () => {
    Alert.alert(
      "日付の修正",
      "日付データを今日の日付に更新しますか？これはデバッグ用の機能です。",
      [
        {
          text: "キャンセル",
          style: "cancel",
        },
        {
          text: "修正する",
          style: "default",
          onPress: async () => {
            try {
              const result = await forceUpdateDate();
              if (result) {
                Alert.alert("成功", "日付が正常に更新されました。");
                fetchDatabaseInfo();
              } else {
                Alert.alert("エラー", "日付の更新中にエラーが発生しました。");
              }
            } catch (error) {
              console.error("日付更新エラー:", error);
              Alert.alert("エラー", "日付の更新中にエラーが発生しました。");
            }
          },
        },
      ]
    );
  };

  // データベース内容を表示するモーダル
  const renderDatabaseModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <ThemedText type="subtitle">データベース内容</ThemedText>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Feather name="x" size={24} color="#FF6347" />
            </TouchableOpacity>
          </View>

          <RNScrollView style={styles.modalContent}>
            <ThemedText type="defaultSemiBold">テーブル一覧:</ThemedText>
            {tables.map((table) => (
              <TouchableOpacity
                key={table}
                style={[
                  styles.tableItem,
                  selectedTable === table && styles.selectedTableItem,
                ]}
                onPress={() => fetchTableContent(table)}
              >
                <ThemedText>{table}</ThemedText>
              </TouchableOpacity>
            ))}

            {selectedTable && (
              <>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                  テーブル: {selectedTable}
                </ThemedText>

                <ThemedText type="defaultSemiBold">スキーマ:</ThemedText>
                <RNScrollView horizontal={true} style={styles.tableContainer}>
                  <View>
                    <View style={styles.tableHeader}>
                      {tableSchema.map((column) => (
                        <ThemedText key={column.name} style={styles.headerCell}>
                          {column.name} ({column.type})
                        </ThemedText>
                      ))}
                    </View>
                  </View>
                </RNScrollView>

                <ThemedText type="defaultSemiBold">データ内容:</ThemedText>
                <RNScrollView horizontal={true} style={styles.tableContainer}>
                  <View>
                    {tableContent.length > 0 ? (
                      tableContent.map((row, rowIndex) => (
                        <View key={`row-${rowIndex}`} style={styles.tableRow}>
                          {Object.entries(row).map(
                            ([key, value], cellIndex) => (
                              <ThemedText
                                key={`cell-${rowIndex}-${cellIndex}`}
                                style={styles.tableCell}
                              >
                                {value === null
                                  ? "null"
                                  : typeof value === "object"
                                  ? JSON.stringify(value)
                                  : String(value)}
                              </ThemedText>
                            )
                          )}
                        </View>
                      ))
                    ) : (
                      <ThemedText>データがありません</ThemedText>
                    )}
                  </View>
                </RNScrollView>
              </>
            )}
          </RNScrollView>

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={fetchDatabaseInfo}
          >
            <ThemedText style={styles.buttonText}>情報を更新</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </Modal>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar style="auto" />
      <ThemedView style={styles.header}>
        <ThemedText type="title">TOEIC学習ガイド</ThemedText>
      </ThemedView>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <Feather name="book-open" size={24} color="#4169E1" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Part 5: 短文穴埋め問題
            </ThemedText>
          </ThemedView>
          <ThemedText style={styles.paragraph}>
            Part
            5では、短い文章の中の空欄に当てはまる適切な単語を選ぶ問題が出題されます。文法知識や語彙力が試されます。
          </ThemedText>
          <ThemedView style={styles.tips}>
            <ThemedText type="defaultSemiBold">学習のコツ:</ThemedText>
            <ThemedText>
              • 品詞（名詞、動詞、形容詞など）の使い方を確認
            </ThemedText>
            <ThemedText>• 時制や態（能動態・受動態）に注意</ThemedText>
            <ThemedText>• 前置詞の使い方を復習</ThemedText>
            <ThemedText>• 接続詞と関係代名詞の用法を理解</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <Feather name="clock" size={24} color="#4169E1" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              学習計画
            </ThemedText>
          </ThemedView>
          <ThemedText style={styles.paragraph}>
            毎日10問ずつ解くことで、少しずつ実力が身につきます。間違えた問題は復習して、苦手な文法項目を特定しましょう。
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <Feather name="award" size={24} color="#4169E1" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              点数目標
            </ThemedText>
          </ThemedView>
          <ThemedText style={styles.paragraph}>
            Part
            5は30問で構成され、各問1点の配点です。25問以上正解することを目指しましょう。
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <Feather name="database" size={24} color="#FF6347" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              データベース管理
            </ThemedText>
          </ThemedView>
          <ThemedText style={styles.paragraph}>
            アプリの問題が正しく表示されない場合や、エラーが発生する場合はデータベースのリセットをお試しください。
          </ThemedText>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleDatabaseReset}
            >
              <ThemedText style={styles.buttonText}>
                データベースをリセット
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => {
                fetchDatabaseInfo();
                setModalVisible(true);
              }}
            >
              <ThemedText style={styles.buttonText}>
                データベースを表示
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={[styles.buttonContainer, { marginTop: 8 }]}>
            <TouchableOpacity style={styles.fixButton} onPress={handleDateFix}>
              <ThemedText style={styles.buttonText}>
                日付データを修正
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ScrollView>

      {renderDatabaseModal()}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    marginLeft: 8,
    marginBottom: 8,
    marginTop: 16,
  },
  paragraph: {
    lineHeight: 22,
    marginBottom: 12,
  },
  tips: {
    backgroundColor: "rgba(65, 105, 225, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resetButton: {
    backgroundColor: "#FF6347",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  viewButton: {
    backgroundColor: "#4169E1",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalContent: {
    flex: 1,
  },
  tableItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 4,
  },
  selectedTableItem: {
    backgroundColor: "rgba(65, 105, 225, 0.1)",
    borderRadius: 4,
  },
  tableContainer: {
    marginBottom: 16,
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(65, 105, 225, 0.2)",
    padding: 4,
    marginBottom: 4,
  },
  headerCell: {
    fontWeight: "bold",
    padding: 8,
    marginRight: 4,
    minWidth: 120,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableCell: {
    padding: 8,
    marginRight: 4,
    minWidth: 120,
  },
  refreshButton: {
    backgroundColor: "#4169E1",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  fixButton: {
    backgroundColor: "#32CD32", // ライムグリーン
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
});
