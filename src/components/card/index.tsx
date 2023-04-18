import { Image, View } from "react-native";
import { Badge, Card, Text } from "react-native-paper";

import { CardProps } from "./types";

//TODO:  Move func to Utils directory
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate().toString().padStart(2, "0");
  const month = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();

  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
}

// TODO: refactor component
const CardComponent = ({ title, publishedDate, image_url }: CardProps) => {
  return (
    <Card
      style={{
        margin: 10,
        overflow: "hidden",
        height: 120,
        backgroundColor: "#f9f9f9",
      }}
      mode="contained"
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, marginRight: 40, marginLeft: 5 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Badge
              size={5}
              style={{
                backgroundColor: "#949bad",
                marginRight: 5,
                alignSelf: "center",
              }}
            />
            <Text variant="labelSmall" style={{ color: "#949bad" }}>
              {formatDate(publishedDate)}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 8,
            }}
            variant="titleMedium"
          >
            {title}
          </Text>
        </View>
        <View>
          <Image
            source={{ uri: image_url }}
            style={{ width: 130, height: 120, borderRadius: 5 }}
          />
        </View>
      </View>
    </Card>
  );
};

export default CardComponent;
