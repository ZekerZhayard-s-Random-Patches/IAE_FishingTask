
var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var FieldInsnNode = Java.type("org.objectweb.asm.tree.FieldInsnNode");
var JumpInsnNode = Java.type("org.objectweb.asm.tree.JumpInsnNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");
var VarInsnNode = Java.type("org.objectweb.asm.tree.VarInsnNode");

function initializeCoreMod() {
    return {
        "FishingTask_keepRunning": {
            "target": {
                "type": "METHOD",
                "class": "forge/net/mca/entity/ai/brain/tasks/chore/FishingTask",
                "methodName": "keepRunning",
                "methodDesc": "(Lnet/minecraft/world/server/ServerWorld;Lforge/net/mca/entity/VillagerEntityMCA;J)V"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.GETFIELD && node.owner.equals("forge/net/mca/entity/ai/brain/tasks/chore/FishingTask") && node.name.equals(ASMAPI.mapField("list")) && node.desc.equals("Ljava/util/List;")) {
                        var node0 = node;
                        while (node0.getOpcode() !== Opcodes.IFLT) {
                            node0 = node0.getPrevious();
                            if (node0 == null) {
                                return mn;
                            }
                        }
                        mn.instructions.insertBefore(node, new FieldInsnNode(Opcodes.GETFIELD, "forge/net/mca/entity/ai/brain/tasks/chore/FishingTask", "list", "Ljava/util/List;"));
                        mn.instructions.insertBefore(node, new MethodInsnNode(Opcodes.INVOKEINTERFACE, "java/util/List", "size", "()I", true));
                        mn.instructions.insertBefore(node, new JumpInsnNode(Opcodes.IFEQ, node0.label));
                        mn.instructions.insertBefore(node, new VarInsnNode(Opcodes.ALOAD, 0));
                        break;
                    }
                }
                return mn;
            }
        }
    }
}
