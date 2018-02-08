package cn.hikyson.godeye.monitor.modules;

import android.content.Context;
import android.content.pm.PackageManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import cn.hikyson.godeye.monitor.GodEyeMonitor;

/**
 * Created by kysonchao on 2017/9/4.
 */
public class AppInfoModule extends BaseModule<AppInfoModule.AppInfo> {

    @Override
    AppInfo popData() {
        return new AppInfo();
    }

    public static class AppInfo {
        public String packageName;
        public List<List<String>> extentions;

        public AppInfo() {
            if (sAppInfoConext == null) {
                return;
            }
            Context context = sAppInfoConext.getContext();
            PackageManager pm = context.getPackageManager();
            this.packageName = context.getApplicationInfo().packageName;
            this.extentions = new ArrayList<>();
            if (sAppInfoConext.getAppInfo() != null && !sAppInfoConext.getAppInfo().isEmpty()) {
                for (Map.Entry<String, Object> entry : sAppInfoConext.getAppInfo().entrySet()) {
                    List<String> kv = new ArrayList<>();
                    kv.add(entry.getKey());
                    kv.add(entry.getValue().toString());
                    this.extentions.add(kv);
                }
            }
        }
    }

    private static GodEyeMonitor.AppInfoConext sAppInfoConext;

    public static void injectAppInfoConext(GodEyeMonitor.AppInfoConext appInfoConext) {
        sAppInfoConext = appInfoConext;
    }

}
