using ClassLibrary2;

namespace ClassLibrary2.Test;

[TestClass]
public sealed class TextToolsTests
{
    [TestMethod]
    public void Reverse_ReturnsCharactersInReverseOrder()
    {
        Assert.AreEqual("cba", TextTools.Reverse("abc"));
    }

    [TestMethod]
    public void Reverse_Null_Throws()
    {
        Assert.ThrowsExactly<ArgumentNullException>(() => TextTools.Reverse(null!));
    }

    [TestMethod]
    public void IsPalindrome_IgnoresCaseAndPunctuation()
    {
        Assert.IsTrue(TextTools.IsPalindrome("A man, a plan, a canal: Panama"));
    }

    [TestMethod]
    public void IsPalindrome_ReturnsFalseForNonPalindrome()
    {
        Assert.IsFalse(TextTools.IsPalindrome("library"));
    }

    [TestMethod]
    public void WordCount_CountsWordsSeparatedByWhitespace()
    {
        Assert.AreEqual(3, TextTools.WordCount("one\ttwo\nthree"));
    }

    [TestMethod]
    public void WordCount_EmptyOrWhitespace_ReturnsZero()
    {
        Assert.AreEqual(0, TextTools.WordCount("   "));
    }
}
