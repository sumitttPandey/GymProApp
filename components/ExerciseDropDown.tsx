import { View } from "react-native"
import { Picker } from "@react-native-picker/picker"

export function ExerciseDropDown({
  items,
  value,
  onSelect,
}: {
  items: string[]
  value: string | null
  onSelect: (v: string) => void
}) {
  return (
    <View className="bg-[#657ee1] rounded-xl mb-4">
      <Picker
        selectedValue={value}
        onValueChange={(v) => v && onSelect(v)}
        dropdownIconColor="#fff"
        style={{ color: "white" }}
      >
        <Picker.Item label="Select Exercise" value={null} />
        {items.map(item => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>
    </View>
  )
}