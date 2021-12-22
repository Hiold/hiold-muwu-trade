<template>
    <div id="alert">
        <div class="alert">        <!-- 提示窗口（Alert/Confirm/Prompt） -->
            <div class="fil"></div>
            <header>
                <span>友情提示</span>
                <i>✘</i>
            </header>
            <section>
                <div class="tit">
                    <div class="icon"></div>
                </div>

                <p>
                    &nbsp;请输入正确的数量<br>
                </p>
                <input type="text" class="alert-val">
            </section>
            <footer>
                <div class="close">取消</div>
                <div class="confirm">确认</div>
            </footer>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AlertCommon",
        props: ["couProps"]
    }
</script>

<style scoped>

</style>
