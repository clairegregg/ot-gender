import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import Markdown, { ASTNode } from '@ronradtke/react-native-markdown-display';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface OtRecommendationsProp {
    recommendationType: string,
    recommendations: string
}



export function OtReccomendationsScreen({recommendationType, recommendations}: OtRecommendationsProp) {
    const insets = useSafeAreaInsets()
    return (
        <ScrollView contentContainerStyle={{
            justifyContent: "center",
            padding: 20,
            alignItems: "stretch",
            flexDirection: "column",
            marginBottom: insets.bottom
        }}>
            <Text variant='headlineSmall' style={styles['.MainTitle']}>{recommendationType}</Text>
            <Divider/>
            <Markdown rules={rules} mergeStyle={false}>
                {recommendations}
            </Markdown>
        </ScrollView>
    );
}

const rules = {
    heading1: (node: ASTNode, children: React.ReactNode[], parent: ASTNode[], inputStyles: any) =>
      <Text key={node.key} variant='titleLarge' style={styles['.Heading']}>
        {children}
      </Text>,
    heading2: (node: ASTNode, children: React.ReactNode[], parent: ASTNode[], inputStyles: any) =>
      <Text key={node.key} variant='titleMedium' style={styles['.Heading']}>
        {children}
      </Text>,
    heading3: (node: ASTNode, children: React.ReactNode[], parent: ASTNode[], inputStyles: any) =>
      <Text key={node.key} variant='titleSmall' style={styles['.Heading']}>
        {children}
      </Text>,
    heading4: (node: ASTNode, children: React.ReactNode[], parent: ASTNode[], inputStyles: any) =>
      <Text key={node.key} variant='labelLarge' style={styles['.Label']}>
        {children}
      </Text>,
    heading5: (node: ASTNode, children: React.ReactNode[], parent: ASTNode[], inputStyles: any) =>
      <Text key={node.key} variant='labelMedium' style={styles['.Label']}>
        {children}
      </Text>,
    heading6: (node: ASTNode, children: React.ReactNode[], parent: ASTNode[], inputStyles: any) =>
      <Text key={node.key} variant='labelSmall' style={styles['.Label']}>
        {children}
      </Text>
};

const styles = StyleSheet.create({
  ".MainTitle": {
    justifyContent: "center",
    alignItems: "stretch",
    paddingBottom: 15,
    fontWeight: "bold"
  },
  ".Heading": {
    paddingVertical: 20
  },
  ".Label": {
    paddingTop: 20
  }
});
