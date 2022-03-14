<template>
    <div class="Act-task" style="display: block;">        <!-- 活动任务 -->
        <div class="task-day">    <!-- 每日任务 -->


            <li class="task-list">
                <header>
                    <div class="title">今日击杀100只僵尸</div>
                    <div class="schedule">100/100</div>
                </header>
                <section>
                    <div class="reward">
                        <div><img src="images/items/jf2.png"/> <span>20000</span></div>
                        <div><img src="images/items/red-zs.png"/> <span>100</span></div>
                    </div>
                    <div class="btn b1">领取</div>
                    <div class="btn b2" style="display:none;">已领取</div>
                    <div class="btn b3" style="display:none;">未完成</div>
                </section>
            </li>


            <li class="task-list">
                <header>
                    <div class="title">今日游戏在线时长达到240分钟</div>
                    <div class="schedule">1/240</div>
                </header>
                <section>
                    <div class="reward">
                        <div>
                            <img src="images/items/jf2.png">
                            <span>20000</span>
                        </div>
                        <div>
                            <img src="images/items/red-zs.png">
                            <span>100</span>
                        </div>
                    </div>
                    <div class="btn b1" style="display:none;">领取</div>
                    <div class="btn b2" style="display:none;">已领取</div>
                    <div class="btn b3">未完成</div>
                </section>
            </li>
        </div>
    </div>
    <div class="task-main" style="display: none;">    <!-- 主线任务 -->
        <li class="task-list">
            <header>
                <div class="title">游戏等级达到200级</div>
                <div class="schedule">200/200</div>
            </header>
            <section>
                <div class="reward">
                    <div>
                        <img src="images/items/jf2.png">
                        <span>20000</span>
                    </div>
                    <div>
                        <img src="images/items/red-zs.png">
                        <span>100</span>
                    </div>
                </div>
                <div class="btn b1">领取</div>
                <div class="btn b2" style="display:none;">已领取</div>
                <div class="btn b3" style="display:none;">未完成</div>
            </section>
        </li>

        <li class="task-list">
            <header>
                <div class="title">开服至今累计签到100次</div>
                <div class="schedule">100/100</div>
            </header>
            <section>
                <div class="reward">
                    <div>
                        <img src="images/items/jf2.png">
                        <span>20000</span>
                    </div>
                    <div>
                        <img src="images/items/red-zs.png">
                        <span>100</span>
                    </div>
                </div>
                <div class="btn b1">领取</div>
                <div class="btn b2" style="display:none;">已领取</div>
                <div class="btn b3" style="display:none;">未完成</div>
            </section>
        </li>
        <li class="task-list">
            <header>
                <div class="title">开服至今累计在线时长达到200小时</div>
                <div class="schedule">1/200</div>
            </header>
            <section>
                <div class="reward">
                    <div>
                        <img src="images/items/jf2.png">
                        <span>20000</span>
                    </div>
                    <div>
                        <img src="images/items/red-zs.png">
                        <span>100</span>
                    </div>
                </div>
                <div class="btn b1" style="display:none;">领取</div>
                <div class="btn b2">已领取</div>
                <div class="btn b3" style="display:none;">未完成</div>
            </section>
        </li>
    </div>
</template>

<script>
    export default {
        name: "ActTask"
    }
</script>

<style scoped>

</style>
