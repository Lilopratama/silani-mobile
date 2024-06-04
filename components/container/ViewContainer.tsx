import { View, Text } from "react-native";
import React from "react";

type ViewContainerProps = {
   children: React.ReactNode;
};
const ViewContainer = (props: ViewContainerProps) => {
   return <View className="flex-1 bg-white px-[20]">{props.children}</View>;
};

export default ViewContainer;
